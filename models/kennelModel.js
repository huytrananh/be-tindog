const mongoose = require('mongoose')

const kennelSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "Email is required"],
        trim: true,
        lowercase: true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Email is invalid")
        //     }
        // }
    },
    name: {
        type: String,
        require: [true, "Name is required"],
        trim: true,
    },
    phone:{
        type: Number,
        require: [true, "Phone number is required"],
    },
    since:{
        type: Number,
        required:[true, "since is required"]
    },
    breeds:[String],
    images:{
        type:String,
        required:[true, "img is required"]
    },
    slogan:{
        type: String,
        required:[true, "title is required"]
    },
    desc:{
        type: String,
        required:[true, "desc is required"]
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User", 
    },
    city: String,
    },{
    timestamps: true,
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
})

kennelSchema.virtual('purebreds', {
    ref: 'Purebred',
    localField: '_id',
    foreignField: 'kennel',
  });

kennelSchema.statics.convertToObject = async function(arr){
    //Change arr to arr of objectId
    //Find the tag from each string from tag model
    let foo = arr.map(async e => { 
        let bar = await this.findOne({tag: e.toLowerCase().trim() })
        
        if(bar)
            return bar

        bar = await this.create({ tag: e.toLowerCase().trim() })
        return bar 
    })
    let result = await Promise.all(foo)
    console.log(result)

    return result
}

kennelSchema.index({name: "text"})
const Kennel = mongoose.model("Kennel", kennelSchema)
module.exports = Kennel