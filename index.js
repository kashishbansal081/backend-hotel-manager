const { connectDB } = require("./db/db.connect");
const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.use(express.json());

connectDB();

const Hotel = require("./models/hotel.models");

// const newHotel = {
//   name: "New Hotel 1",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: [
//     "Room Service",
//     "Horse riding",
//     "Boating",
//     "Kids Play Area",
//     "Bar",
//   ],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: [
//     "https://example.com/hotel2-photo1.jpg",
//     "https://example.com/hotel2-photo2.jpg",
//   ],
// };

const albums = [
  { id: 1, title: "Abbey Road", artist: "The Beatles", year: 1969 },
  {
    id: 2,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
  },
  { id: 3, title: "Thriller", artist: "Michael Jackson", year: 1982 },
];

const seedData = async (newHotel) => {
  try {
    const newHot = new Hotel(newHotel);
    const hotelSaved = newHot.save();
    return hotelSaved;
  } catch (err) {
    throw err;
  }
};

// seedData(newHotel)

app.post("/hotels", async (req, res) => {
  try {
    const savedHotel = await seedData(req.body);
    res
      .status(201)
      .json({ message: "Hotel added successfully.", hotel: savedHotel });
  } catch (error) {
    res.status(500).json({ error: "Failed to add Hotel." });
  }
});

app.get("/", (req, res) => {
  res.send("Hello, This is Express Assignment Server.");
});

// seedData(newHotel)

const readAllHotels = async () => {
  try {
    const readAllHot = await Hotel.find();
    //  console.log(readAllHot);
    return readAllHot;
  } catch (err) {
    throw err;
  }
};

// readAllHotels();

//-------------------------------------------------------------------------------------------------
app.get("/hotels", async (req, res) => {
  try {
    const allHotels = await readAllHotels();
    if (allHotels.length != 0) {
      res.json(allHotels);
    } else {
      res.status(400).json({ error: "Hotels data not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Api is not sending the response." });
  }
});

//-------------------------------------------------------------------------------------------------

const readHotelByName = async (hotelName) => {
  try {
    const hotelByName = await Hotel.findOne({ name: hotelName });
    //  console.log(hotelByName);
    return hotelByName;
  } catch (err) {
    throw err;
  }
};

// readHotelByName('Lake View');

//-------------------------------------------------------------------------------------------------

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const readByName = await readHotelByName(req.params.hotelName);
    if (readByName) {
      res.json(readByName);
    } else {
      res.status(400).json({ error: "Hotels does not exist with this name." });
    }
  } catch (error) {
    res.status(500).json({ error: "Api is not sending the response." });
  }
});

//-------------------------------------------------------------------------------------------------

const isParkingAvailable = async (isParking) => {
  try {
    const hotelByParking = await Hotel.find({ isParkingAvailable: isParking });
    console.log(hotelByParking);
  } catch (err) {
    throw err;
  }
};

// isParkingAvailable(true)

const isRestaurantAvailable = async (isRestaurant) => {
  try {
    const hotelByRestaurant = await Hotel.find({
      isRestaurantAvailable: isRestaurant,
    });
    console.log(hotelByRestaurant);
  } catch (err) {
    throw err;
  }
};

// isRestaurantAvailable(true)

const readHotelsByCategory = async (hotelCategory) => {
  try {
    const hotelByCategory = await Hotel.find({ category: hotelCategory });
    //  console.log(hotelByCategory);
    return hotelByCategory;
  } catch (err) {
    throw err;
  }
};

//-------------------------------------------------------------------------------------------------
app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const readByCategory = await readHotelsByCategory(req.params.hotelCategory);
    if (readByCategory.length != 0) {
      res.json(readByCategory);
    } else {
      res
        .status(400)
        .json({ error: "Hotels does not exist with this category." });
    }
  } catch (error) {
    res.status(500).json({ error: "Api is not sending the response." });
  }
});
//-------------------------------------------------------------------------------------------------

// readHotelsByCategory('Mid-Range')

const readHotelsByPrice = async (byPrice) => {
  try {
    const hotelByPrice = await Hotel.find({ priceRange: byPrice });
    console.log(hotelByPrice);
  } catch (err) {
    throw err;
  }
};

// readHotelsByPrice('$$$$ (61+)')

const readHotelsByRating = async (byRating) => {
  try {
    const hotelByRating = await Hotel.find({ rating: byRating });
    //  console.log(hotelByRating);
    return hotelByRating;
  } catch (err) {
    throw err;
  }
};

// readHotelsByRating(4.0)

//-------------------------------------------------------------------------------------------------
app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const readByRating = await readHotelsByRating(req.params.hotelRating);
    if (readByRating.length != 0) {
      res.json(readByRating);
    } else {
      res
        .status(400)
        .json({ error: "Hotels does not exist with this rating." });
    }
  } catch (error) {
    res.status(500).json({ error: "Api is not sending the response." });
  }
});
//-------------------------------------------------------------------------------------------------

const readHotelByPhoneNumber = async (byNumber) => {
  try {
    const hotelByNumber = await Hotel.findOne({ phoneNumber: byNumber });
    //  console.log(hotelByNumber);
    return hotelByNumber;
  } catch (err) {
    throw err;
  }
};

// readHotelByPhoneNumber("+1299655890")

//-------------------------------------------------------------------------------------------------
app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const readByNumber = await readHotelByPhoneNumber(req.params.phoneNumber);
    if (readByNumber) {
      res.json(readByNumber);
    } else {
      res
        .status(400)
        .json({ error: "Hotels does not exist with this Phone Number." });
    }
  } catch (error) {
    res.status(500).json({ error: "Api is not sending the response." });
  }
});
//-------------------------------------------------------------------------------------------------

async function updateHotelCheckOutTimeById(hotelId, dataToUpdate) {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    return updateHotel;
  } catch (error) {
    console.log(error);
  }

  // console.log(updateHotel);
}

// updateHotelCheckOutTimeById('685e5facbfa6cff89e77a26c',{checkOutTime : '11:00 A.M'})

//-------------------------------------------------------------------------------------------------

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await updateHotelCheckOutTimeById(
      req.params.hotelId,
      req.body
    );
    console.log(updatedHotel)
    if (updatedHotel) {
      res
        .status(200)
        .json({ messgae: "Hotel updated successfully", updatedHotel });
    } else {
      res.status(400).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Hotel." });
  }
});

//-------------------------------------------------------------------------------------------------

async function updateHotelRatingByName(name, dataToUpdate) {
  const updateHotel = await Hotel.findOneAndUpdate(
    { name: name },
    dataToUpdate,
    { new: true }
  );
  console.log(updateHotel);
}

// updateHotelRatingByName('Sunset Resort',{rating : 4.2})

async function updateHotelNumberByNumber(number, dataToUpdate) {
  const updateHotel = await Hotel.findOneAndUpdate(
    { phoneNumber: number },
    dataToUpdate,
    { new: true }
  );
  console.log(updateHotel);
}

// updateHotelNumberByNumber("+1299655890",{phoneNumber : "+1997687392"})

async function deleteHotelById(hotelId) {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(hotelId);
    // console.log(deleteHotel);
    return deleteHotel;
  } catch (error) {
    console.log("Error while delete Hotel by id", error);
  }
}

// deleteHotelById('685bc33369ba2e9f7a749c0d')

//-------------------------------------------------------------------------------------------------

app.delete("/hotel/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await deleteHotelById(req.params.hotelId);
    if (deletedHotel) {
      res.status(200).json({ message: "Hotel deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Hotel." });
  }
});

//-------------------------------------------------------------------------------------------------

async function deleteHotelByPhoneNumber(phoneNumber) {
  try {
    const deleteHotel = await Hotel.findOneAndDelete({
      phoneNumber: phoneNumber,
    });
    console.log(deleteHotel);
  } catch (error) {
    console.log("Error while delete Hotel by Phone Number", error);
  }
}

// deleteHotelByPhoneNumber('+1997687392')

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
