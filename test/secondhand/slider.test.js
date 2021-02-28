'use strict';

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose');
const { findAllCars ,carsLength, generarRamdon } = require('../../public/js/UsedCars/slide_used_cars');
const UsedCarModel = require('../../models/usedCars');

const carData ={ carBrand: 'Toyota', carModel: 'Yaris', modelYear: 122};


let  mongo;

beforeAll( async () =>{
     mongo = new MongoMemoryServer();
    const mongoURI = await mongo.getUri();

    await mongoose.connect(mongoURI,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
});

describe('Slider functions test', () =>{

    it('Crear y guardar coche correctamente', async () => {
        for(let i=0; i<3; i++){
            let validCar = new UsedCarModel(carData);
            let savedUsedCar = await validCar.save();
        }
    });

    it('Recuperamos elementos de la base de datos', async () =>{
        const allCars = await findAllCars();
        expect(allCars.length).toBe(3);
    });

    it.skip('La función carLength debe devolver 3', async () =>{
        console.log( await UsedCarModel.find().lean());
        expect(await carsLength()).toBe(3);
    });

    it.skip('la función generar random debe devolver un número entre 0 y 3', async () =>{
        expect(await generarRamdon()).toBe("^[0-3]?");
    })
})




afterAll(async () => {

    const collections = await mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
    await mongo.stop();
    await mongoose.connection.close()

})




    
    
