// import jwt from "jsonwebtoken";
// import appointmentModel from "../models/appointmentModel.js";
// import doctorModel from "../models/doctorModel.js";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import { v2 as cloudinary } from "cloudinary";
// import userModel from "../models/userModel.js";


// // API for admin login
// cloudinary.config({
//     cloud_name:'dzb1ys8px',
//     api_key:'346223172952973',
//     api_secret:'Dm24BBG0GN6O4h-HkBwk26aIR38',
// });
// console.log("Cloudinary Configdere:", {
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY
// });

// // API for admin login
// const loginAdmin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             res.json({ success: true, token });
//         } else {
//             res.json({ success: false, message: "Invalid credentials" });
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// // API to get all appointments list
// const appointmentsAdmin = async (req, res) => {
//     try {
//         const appointments = await appointmentModel.find({});
//         res.json({ success: true, appointments });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// // API for appointment cancellation
// const appointmentCancel = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;
//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
//         res.json({ success: true, message: 'Appointment Cancelled' });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// // API for adding Doctor
// const addDoctor = async (req, res) => {
//     try {
//         const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
//         const imageFile = req.file;

//         // Check for missing details
//         if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
//             return res.json({ success: false, message: "Missing Details" });
//         }

//         // Validate email format
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }

//         // Validate password strength
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Image upload to Cloudinary
//         if (imageFile) {
//             const timestamp = Math.floor(Date.now() / 1000);
//             const signature = cloudinary.utils.api_sign_request(
//                 { folder: "doctors", timestamp },
//                 '346223172952973' // Use the API key from the environment variable
//             );

//             const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//                 folder: "doctors",
//                 resource_type: "image",
//                 timestamp,
//                 signature,
//             });

//             const imageUrl = imageUpload.secure_url;

//             // Doctor data
//             const doctorData = {
//                 name,
//                 email,
//                 image: imageUrl,
//                 password: hashedPassword,
//                 speciality,
//                 degree,
//                 experience,
//                 about,
//                 fees,
//                 address: JSON.parse(address),
//                 date: Date.now(),
//             };

//             // Save doctor
//             const newDoctor = new doctorModel(doctorData);
//             await newDoctor.save();
//             res.status(200).json({ success: true, message: 'Doctor Added' });
//         } else {
//             res.json({ success: false, message: "Image file is missing" });
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(404).json({ success: false, message: error.message });
//     }
// }

// // API to get all doctors list for admin panel
// const allDoctors = async (req, res) => {
//     try {
//         const doctors = await doctorModel.find({}).select('-password');
//         res.json({ success: true, doctors });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// // API to get dashboard data for admin panel
// const adminDashboard = async (req, res) => {
//     try {
//         const doctors = await doctorModel.find({});
//         const users = await userModel.find({});
//         const appointments = await appointmentModel.find({});

//         const dashData = {
//             doctors: doctors.length,
//             appointments: appointments.length,
//             patients: users.length,
//             latestAppointments: appointments.reverse(),
//         };

//         res.json({ success: true, dashData });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// export {
//     loginAdmin,
//     appointmentsAdmin,
//     appointmentCancel,
//     addDoctor,
//     allDoctors,
//     adminDashboard,
// }
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// Cloudinary Configuration (Directly set the credentials here)
// cloudinary.config({
//     cloud_name: 'dzb1ys8px',
//     api_key: '346223172952973',
//     api_secret: 'Dm24BBG0GN6O4h-HkBwk26aIR38',
// });
// console.log("Cloudinary Configdere:", {
//     cloud_name: 'dzb1ys8px',
//     api_key: '346223172952973',
//     api_secret: 'Dm24BBG0GN6O4h-HkBwk26aIR38',
// });

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded admin email and password check
        if (email === 'admin@example.com' && password === 'greatstack123') {
            const token = jwt.sign({ email }, 'clinic-assingment', { expiresIn: '1d' });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        res.json({ success: true, message: 'Appointment Cancelled' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for adding Doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Check for missing details
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Image upload to Cloudinary
        if (imageFile) {
            // const timestamp = Math.floor(Date.now() / 1000);
            // const signature = cloudinary.utils.api_sign_request(
            //     { folder: "doctors", timestamp }, 346223172952973 // Hardcoded API key
            // );

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                folder: "doctors",
                resource_type: "image",
                // timestamp,
                // signature,
            });

            const imageUrl = imageUpload.secure_url;

            // Doctor data
            const doctorData = {
                name,
                email,
                image: imageUrl,
                password: hashedPassword,
                speciality,
                degree,
                experience,
                about,
                fees,
                address: JSON.parse(address),
                date: Date.now(),
            };

            // Save doctor
            const newDoctor = new doctorModel(doctorData);
            await newDoctor.save();
            res.status(200).json({ success: true, message: 'Doctor Added' });
        } else {
            res.json({ success: false, message: "Image file is missing" });
        }

    } catch (error) {
        console.log("error==>",error);
        res.status(404).json({ success: false, message: error.message });
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse(),
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addDoctor,
    allDoctors,
    adminDashboard,
}
