import Scan from '../model/result.js';

// Get all scans
export const getScans = async (request, response) => {
    try{
        const scans = await Scan.find();
        response.status(200).json(scans);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of the scan in database
export const addScan = async (request, response) => {
    const scan = request.body;
    console.log(scan)
    const newScan = new Scan(scan);
    try{
        await newScan.save();
        response.status(201).json(newScan);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// Get a scan by id
export const getScanById = async (request, response) => {
    try{
        const scan = await Scan.findById(request.params.id);
        response.status(200).json(scan);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of edited scan in the database
export const editScan = async (request, response) => {
    let scan = request.body;

    const editScan = new Scan(scan);
    try{
        await Scan.updateOne({_id: request.params.id}, editScan);
        response.status(201).json(editScan);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// deleting data of user from the database
export const deleteScan = async (request, response) => {
    try{
        await Scan.deleteOne({_id: request.params.id});
        response.status(201).json("Scan deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}