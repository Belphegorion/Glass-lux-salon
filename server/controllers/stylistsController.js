import Stylist from '../models/Stylist.js';

export async function listStylists(req, res){
  const stylists = await Stylist.find().lean();
  res.json(stylists);
}
export async function createStylist(req, res){
  const stylist = await Stylist.create(req.body);
  res.status(201).json(stylist);
}
export async function getStylist(req, res){
  const stylist = await Stylist.findById(req.params.id).lean();
  if(!stylist) return res.status(404).json({error:'Not found'});
  res.json(stylist);
}
export async function updateStylist(req, res){
  const stylist = await Stylist.findByIdAndUpdate(req.params.id, req.body, {new:true});
  if(!stylist) return res.status(404).json({error:'Not found'});
  res.json(stylist);
}
export async function deleteStylist(req, res){
  await Stylist.findByIdAndDelete(req.params.id);
  res.json({ok:true});
}
