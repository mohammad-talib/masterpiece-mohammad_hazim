const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const DB = require("./db");
const app = express();
app.use(cors());
//=========================================================================//
//                                run body
//=========================================================================//
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//=========================================================================//
//                                check server
//=========================================================================//
app.get("/", (req, res) => {
  res.json("server is working");
});

//=========================================================================//
//                                Storage Image
//=========================================================================//
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, response) => {
  arr = file.mimetype.split("/");
  if (arr[0] === "image") {
    response(null, true);
  } else {
    response(new Error("unaccepted format"), false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});
app.use("/upload", express.static("upload"));
app.post("/upload", upload.single("image"), (request, response) => {
  response.json(request.file);
  console.log("request", request.file);
});

//=========================================================================//
//                                Login
//=========================================================================//
app.post("/login", (req, res) => {
  let object = req.body;
  console.log("object", object);
  DB.login(response => {
    res.json(response);
  }, object);
});

//=========================================================================//
//                               Regisration
//=========================================================================//
app.post("/registration", (req, res) => {
  let object = req.body;
  console.log("object", object);
  DB.registerUser(response => {
    res.json(response);
  }, object);
});

//=========================================================================//
//                               get User
//=========================================================================//
app.post("/user", (req, res) => {
  let id = req.body;
  // console.log("objecttttttt", id);
  DB.getUser(response => {
    res.json(response);
  }, id);
});

//=========================================================================//
//                               add Material
//=========================================================================//
app.post("/addmaterial", (req, res) => {
  let object = req.body;
  console.log("objecttttttt", object);
  DB.addMaterial(response => {
    res.json(response);
  }, object);
});

//=========================================================================//
//                                Add Offer
//=========================================================================//
app.post("/senddata", (req, res) => {
  let object = req.body;
  console.log("object", object);
  DB.addOffer(response => {
    res.json(response);
  }, object);
  // console.log("req.body", object);
});

//=========================================================================//
//                               Show Material
//=========================================================================//
app.post("/showmaterial", (req, res) => {
  let object = req.body;
  console.log("objecttttttt", object);
  DB.showMaterial(response => {
    res.send(response);
  }, object);
});

//=========================================================================//
//                               Delete Material
//=========================================================================//
app.delete("/deletematerial", (req, res) => {
  console.log("objecttttttt", req.query);
  DB.deleteMaterial(response => {
    res.send(response);
  }, req.query);
});

//=========================================================================//
//                               Edit Material
//=========================================================================//
app.put("/editmaterial", (req, res) => {
  let object = req.body;
  console.log("objectEdit", object);
  DB.editMaterial(response => {
    res.send(response);
  }, object);
});

//=========================================================================//
//                               Get Offers
//=========================================================================//
app.get("/getoffers", (req, res) => {
  DB.getOffers(response => {
    res.send(response);
  });
});

//=========================================================================//
//                               Post Admin
//=========================================================================//
app.post("/admin", (req, res) => {
  let object = req.body;
  console.log("objecttttttt", object);
  DB.showAdmin(response => {
    res.send(response);
  }, object);
});

//=========================================================================//
//                              Get All Request
//=========================================================================//
app.get("/request", (req, res) => {
  DB.getRequest(response => {
    res.send(response);
  });
});

//=========================================================================//
//                              Get offer for admin
//=========================================================================//
app.get("/getoffersadmin", (req, res) => {
  DB.getOfferAdmin(response => {
    res.send(response);
  });
});

//=========================================================================//
//                              Delete offer for admin
//=========================================================================//
app.delete("/deleteoffer", (req, res) => {
  console.log("objecttttttt", req.query);
  DB.deleteOffer(response => {
    res.send(response);
  }, req.query);
});

//=========================================================================//
//                              Change Photo for User
//=========================================================================//
app.post("/editphoto", (req, res) => {
  let object = req.body;
  console.log("objectEdit", object);
  DB.editPhoto(response => {
    res.send(response);
  }, object);
});

//=========================================================================//
//                              Accept material
//=========================================================================//
app.post("/accept", (req, res) => {
  let object = req.body;
  console.log("Accept", object);
  DB.acceptMaterial(response => {
    console.log("response", response);

    res.send(response);
  }, object);
});

//=========================================================================//
//                              get Offer
//=========================================================================//
app.post("/buyoffer", (req, res) => {
  let object = req.body;
  console.log("GET OFFER", object);
  DB.buyOffer(response => {
    console.log("response", response);

    res.send(response);
  }, object);
});

//=========================================================================//
//                              get buy Offer
//=========================================================================//
app.post("/getbuyoffer", (req, res) => {
  let object = req.body;
  console.log("GET OFFER", object);
  DB.getBuyOffer(response => {
    console.log("response", response);

    res.send(response);
  }, object);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
