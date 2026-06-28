import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected?: number,
};

const connection: ConnectionObject = {};

const connectDB = async ():Promise<void> =>{
    if(connection.isConnected) {
        console.log('Already connected to database');
        return;
    };

    try{
        if (!process.env.MONGO_URI) {
            console.log('MongoDB uri not geted');
            
            return 
        }
        const db = await mongoose.connect(process.env.MONGO_URI);

        connection.isConnected = db.connections[0].readyState;

        console.log('DB connected successfully');
        
        
    }catch(error){
        console.log("DataBase connection is failed");
        process.exit(1);
    }
}

export default connectDB;