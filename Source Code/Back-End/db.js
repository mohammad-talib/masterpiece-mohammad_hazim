const mongoose = require("mongoose");
const md5 = require("md5");
mongoose.set("useCreateIndex", true);
const CONNECTION_URI = process.env.MONGODB || "mongodb://localhost/Recycle";
mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", function() {
  console.log("mongoose connection error");
  console.log("____________________________");
});
db.once("open", function() {
  console.log("mongoose connected successfully");
  console.log("____________________________");
});

let materialSchema = new mongoose.Schema({
  type: String,
  quantity: Number,
  accept: { type: Boolean, default: false }
});

let offerSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  point: Number
});

let userSchema = new mongoose.Schema({
  admin: Boolean,
  photo: String,
  username: {
    type: String,
    required: [true, "User Name Required"]
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password Required"]
  },
  phonenumber: {
    type: String,
    required: [true, "Phone Number Required"]
  },
  point: Number,
  location: {
    type: String,
    required: [true, "Location Required"]
  },
  addmaterial: [materialSchema],
  offers: [offerSchema],
  buyoffer: []
});

let Users = mongoose.model("users", userSchema);

//=========================================================================//
//                                Login
//=========================================================================//
let login = (cb, object) => {
  object.password = md5(object.password);
  Users.findOne(
    { email: object.email, password: object.password },
    (err, res) => {
      if (!err) cb(res);
    }
  );
};

//=========================================================================//
//                               Regisration
//=========================================================================//
let registerUser = (cb, obj) => {
  if (obj.password !== "" && obj.password !== null) {
    obj.password = md5(obj.password);
  }
  obj.admin = false;
  obj.photo = "http://localhost:9000/upload/user.png";
  obj.point = 0;

  Users.create(obj, (err, res) => {
    if (err) {
      var msg = [];

      for (field in err.errors) {
        msg.push(err.errors[field].message);
      }
      console.log("msg", msg);
      cb(msg);
    } else {
      cb("registration successfully completed");
    }
  });
};

//=========================================================================//
//                               get User
//=========================================================================//
let getUser = (cb, object) => {
  Users.findOne({ _id: object.id }, (err, res) => {
    if (!err) cb(res);
  });
};

//=========================================================================//
//                               add Material
//=========================================================================//
let addMaterial = (cb, object) => {
  Users.findOne({ _id: object.id }, function(err, res) {
    if (err) {
      console.log("ERR:", err);
    }

    for (let index in object) {
      if (object[index] === "" || object[index] === null) {
        return cb(index + " Required");
      }
    }
    if (object.quantity <= 0) {
      return cb("The quantity must be a valid number greater than 0");
    }
    let y = {
      type: object.type,
      quantity: object.quantity
    };

    res.addmaterial.push(y);
    res.save(function(err, docsSave) {
      if (err) {
        console.log("ERR:", err);
      }
      cb("Done!");
    });
  });
};

//=========================================================================//
//                                Add Offer
//=========================================================================//
let addOffer = (cb, object) => {
  Users.findOne({ _id: object.id }, function(err, res) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("ressssss", res);
    let offer = {
      image: object.image,
      title: object.title,
      description: object.description,
      point: object.point
    };
    res.offers.push(offer);
    res.save(function(err, docsSave) {
      if (err) {
        console.log("ERR:", err);
      }
      cb(docsSave);
    });
  });
};

//=========================================================================//
//                               Show Material
//=========================================================================//
let showMaterial = (cb, object) => {
  Users.findOne(object, { _id: 0, addmaterial: 1 }, (err, res) => {
    if (!err) cb(res);
  });
};

//=========================================================================//
//                               Delete Material
//=========================================================================//
let deleteMaterial = (cb, params) => {
  Users.update(
    { _id: params.userId },
    { $pull: { addmaterial: { _id: params.materialId } } },
    err => {
      if (!err) showMaterial(cb, { _id: params.userId });
    }
  );
};

//=========================================================================//
//                               Edit Material
//=========================================================================//
let editMaterial = (cb, object) => {
  Users.update(
    { _id: object.userid, "addmaterial._id": object.id },
    {
      $set: {
        "addmaterial.$.type": object.type,
        "addmaterial.$.quantity": object.quantity
      }
    },
    err => {
      if (!err) cb("Done!");
    }
  );
};

//=========================================================================//
//                               Get Offers
//=========================================================================//
let getOffers = cb => {
  Users.find({ admin: true }, function(err, res) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS:", res);
    cb(res);
  });
};

//=========================================================================//
//                              Get All Request
//=========================================================================//
let getRequest = (cb, object) => {
  Users.find(
    { addmaterial: { $elemMatch: { quantity: { $gte: 1 } } } },
    (err, res) => {
      if (!err) {
        cb(res);
      }
    }
  );
};
//=========================================================================//
//                              Get All Offers For Admin
//=========================================================================//
let getOfferAdmin = cb => {
  Users.find({ admin: true }, function(err, res) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS:", res);
    cb(res);
  });
};

//=========================================================================//
//                              Delete offer for admin
//=========================================================================//
let deleteOffer = (cb, params) => {
  console.log("params", params);
  Users.update(
    { _id: params.userId },
    { $pull: { offers: { _id: params.offers } } },
    err => {
      if (!err) getOfferAdmin(cb, { _id: params.userId });
    }
  );
};

//=========================================================================//
//                             Edit Photo
//=========================================================================//
let editPhoto = async (cb, object) => {
  console.log("objectDB", object);
  await Users.updateOne(
    { _id: object.id },
    {
      $set: {
        photo: object.image
      }
    },
    function(err, res) {
      if (err) {
        console.log("ERR:", err);
      }
      console.log("DOCS:", res);
    }
  );
  let test = await Users.findOne({ _id: object.id });
  cb(test);
};

//=========================================================================//
//                              Accept material
//=========================================================================//
let acceptMaterial = (cb, object) => {
  Users.find(
    { addmaterial: { $elemMatch: { _id: object._id } } },
    { "addmaterial.$": 1 },
    (err, res) => {
      var idUser = res[0]._id;
      var quantity = res[0].addmaterial[0].quantity * 3;
      var idMaterial = res[0].addmaterial[0]._id;

      console.log("Userid", idUser);
      console.log("resDB", quantity);
      console.log("resDB", idMaterial);
      Users.updateOne(
        { _id: idUser, "addmaterial._id": idMaterial },
        { $inc: { point: quantity }, $set: { "addmaterial.$.accept": true } },
        (err, res) => {
          if (!err) {
            getRequest(cb, {});
          }
        }
      );
    }
  );
};

//=========================================================================//
//                              GET OFFER
//=========================================================================//
let buyOffer = (cb, object) => {
  var pointOffer = object.params.object.point;
  Users.findOne({ _id: object.params.userId }, (err, res) => {
    var points = res.point;
    if (points >= pointOffer) {
      var offer = points - pointOffer;
      Users.updateOne(
        { _id: object.params.userId },
        { $set: { point: offer }, $push: { buyoffer: object.params.object } },
        (err, res) => {
          console.log("res", res);
          cb("you buy this offer");
        }
      );
    } else {
      cb("you don't have enough point");
    }
  });
};

//=========================================================================//
//                              get buy Offer
//=========================================================================//
let getBuyOffer = (cb, object) => {
  console.log("id", object.id);
  Users.findOne({ _id: object.id }, function(err, res) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS:", res);
    cb(res);
  });
};

module.exports = {
  login,
  registerUser,
  getUser,
  addMaterial,
  showMaterial,
  deleteMaterial,
  editMaterial,
  addOffer,
  getOffers,
  getRequest,
  getOfferAdmin,
  deleteOffer,
  editPhoto,
  acceptMaterial,
  buyOffer,
  getBuyOffer
};
