import Service from '../models/Service.js';

export async function listServices(req, res){
  const services = await Service.find().lean();
  res.json(services);
}
export async function createService(req, res){
  const data = req.body;
  const service = await Service.create(data);
  res.status(201).json(service);
}
export async function getService(req, res){
  const service = await Service.findById(req.params.id).lean();
  if(!service) return res.status(404).json({error:'Not found'});
  res.json(service);
}
export async function updateService(req, res){
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {new:true});
  if(!service) return res.status(404).json({error:'Not found'});
  res.json(service);
}
export async function deleteService(req, res){
  await Service.findByIdAndDelete(req.params.id);
  res.json({ok:true});
}
