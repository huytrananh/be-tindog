const Purebred = require("../models/purebredModel")

exports.createPurebred = async (req, res, next) => {
  try {
    const { name, breed, images, age, height, weight, litter, gender, price, desc, puppyImages } = req.body;
    if (!name || !breed || !images || !age || !height || !weight || litter === undefined || !gender) {
      return res.status(401).json({
        status: "fail",
        message: "Missing somethingsss",
      });
    }

    /// check req.params.kennelId belong to current user ?????

    // get kennel  = await Kennel.findOne({_id:req.params.kennelId, user:req.user._id})
    // if kennel null
    // pha app tao ha
    // else kennel
    const purebred = await Purebred.create({
      name, breed, images, age, height, weight, litter, gender, price, desc, puppyImages, kennel: req.params.kennelId
    });

    res.status(201).json({ status: "success", data: purebred });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
}

exports.getPurebredList = async(req, res, next) => {
  try{
    const id = req.params.kennelId

    const purebred = await Purebred.find({kennel: id})
    res.status(201).json({ status: "success", data: purebred });
  }catch(err){
    res.status(401).json({
      status: "fail",
      message: err.message,
    })
  }
}

exports.updatePurebred = async(req, res, next) => {
  try{
    const purebred = await Purebred.findOneAndUpdate({_id: req.params.purebredId},  {new: true})
  }catch(err){
    res.status(401).json({
      status: "fail",
      message: err.message,
  })
  }
}

exports.deletePurebred = async(req, res, next) => {
  try{
    const purebred = await Purebred.findByIdAndDelete({_id: req.params.purebredId})
    res.status(200).json({
      status: "deleted",
      data: purebred
    });
  }catch(err){
    res.json({ status: "fail", message: "Cannot delete purebred" });
  }
}

exports.getSinglePurebred = async (req, res, next) => {
  try {
    const purebred = await Purebred.findById(req.params.purebredId);
    res.json({ status: "success", data: purebred });
  } catch (err) {
    res.json({ status: "fail", message: err.message });
  }
};