const port=5000;
const express=require("express")
const app=express();
const bodyParser = require('body-parser');
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const path=require("path")
const twilio = require('twilio');

const cors=require("cors");
const { type } = require("os");
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//uploaddation of images
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const upload=multer({storage:storage});
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
//api for teacher message
const TeacherMessage = mongoose.model('teacher_model', {
    id: {
      type: Number,
      required: true,
    },
    ClassNumber: {
      type: Number,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
  });
  
  app.get('/message_data', async (req, res) => {
    try {
      const ClassNumber = parseInt(req.query.ClassNumber);
      if (!ClassNumber || isNaN(ClassNumber)) {
        return res.status(400).json({ error: 'Invalid ClassNumber' });
      }
      const messageData = await TeacherMessage.find({ ClassNumber });
      res.json(messageData);
      console.log(messageData);
    } catch (error) {
      console.log("Error in fetching data", error);
      res.status(500).json({ error: "Error in fetching data" });
    }
  });
app.post('/teacher_meassage',async(req,res)=>{
    try {
        const lastmessage = await TeacherMessage.findOne().sort({ id: -1 });
        let id = 1;
        if (lastmessage) {
            id = lastmessage.id + 1;
        }
        const new_message=new TeacherMessage({
            id:id,
            ClassNumber:parseInt(req.body.ClassNumber),
            Message:req.body.Message,
        })
    
    await new_message.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error saving student:", error);
        res.status(500).json({ success: false, error: "Failed to save student data." });
    }

})
//OTP Sending

//message sending using twilio
const Chatbox=mongoose.model('chatboxmodel',{
    id:{
        type:Number,
        required:true,
    },
    Student_id:{
        type:Number,
        required:true,
    },
    Teacher_id:{
        type:Number,
        required:true,
    },
    Message:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        default: Date.now,
    },
    Reply:{
        type:Boolean,
        required:true
    },
    Replyid:{
            type:Number,
            required:true
    }
})
app.post('/chatdata', async (req, res) => {
    try {
        // Find the last chat entry and determine the next ID
        const lastChat = await Chatbox.findOne().sort({ id: -1 });
        let id = 1;
        if (lastChat) {
            id = lastChat.id + 1;
        }

        // Create a new chat entry
        const newChat = new Chatbox({
            id: id,
            Student_id: parseInt(req.body.Student_id),
            Teacher_id: parseInt(req.body.Teacher_id),
            Message: req.body.Message,
            Reply:req.body.Reply,
            Replyid:req.body.Replyid
        });

        // Save the new chat entry to the database
        await newChat.save();
        console.log("Saved");

        // Send a successful response
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error saving chat data:", error);

        // Send an error response
        res.status(500).json({ 
            success: false, 
            error: "Failed to save chat data." 
        });
    }
});
app.get('/studentchat', async (req, res) => {
    const Teacher_id = parseInt(req.query.Teacher_id);
    try {
      const data = await Chatbox.find({ Teacher_id: Teacher_id ,Reply:false});
      res.json(data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      res.status(500).json({ error: 'Failed to fetch chat messages' });
    }
  });
  app.get('/teachchat', async (req, res) => {
    const Teacher_id = parseInt(req.query.Teacher_id);
    try {
      const data = await Chatbox.find({ Teacher_id: Teacher_id ,Reply:true});
      res.json(data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      res.status(500).json({ error: 'Failed to fetch chat messages' });
    }
  }); 
  app.get('/chatbyid', async (req, res) => {
    const Id = parseInt(req.query.id);
  
    if (isNaN(Id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
  
    try {
      const data = await Chatbox.find({ id: Id, }); // Check if reply is false
      res.json(data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      res.status(500).json({ error: 'Failed to fetch chat messages' });
    }
  });
  
  
  
//Fee structure Message 
const FeeStructure=mongoose.model('FeeModel',{
    id:{
        type:Number,
        required:true,
    },
    ClassNumber:{
        type:Number,
        required:true,
    },
    Fee:{
        type:Number,
        required:true,
    },
})
app.post('/addfee',async(req,res)=>{
    try {
        const lastfee = await FeeStructure.findOne().sort({ id: -1 });
        let id = 1;
        if (lastfee) {
            id = lastfee.id + 1;
        }
        const new_Fee=new FeeStructure({
            id:id,
            ClassNumber:parseInt(req.body.ClassNumber),
            Fee:parseInt(req.body.Fee),
        })
    
    await new_Fee.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error saving student:", error);
        res.status(500).json({ success: false, error: "Failed to save student data." });
    }


})
app.get('/feedata',async(req,res)=>{
    try{
        
        const ClassNumber = parseInt(req.query.ClassNumber);
      if (!ClassNumber || isNaN(ClassNumber)) {
        return res.status(400).json({ error: 'Invalid ClassNumber' });
      }
       
        const fee_data=await FeeStructure.find({ClassNumber:ClassNumber});
        res.json(fee_data);
    }
    catch(error){
        console.error("Error in fetching feedata :", error);
        res.status(500).json({ success: false, error: "Failed to save feedata." });
    }
})
const accountSid = 'AC1e35bf38da84c5e10b62e55a5c87f348'; // Your Account SID from www.twilio.com/console
const authToken = '9fd7c381353e89909462c876fdd22dfb';   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const  to = req.body.phoneNumber;
  const message = req.body.studentMessage;

  client.messages.create({
    body: "kam cho",
    to: "+916375097869",  // Text this number
    from: '+19789915916' // From a valid Twilio number
  })
  .then((message) => {
    res.status(200).send({ success: true, messageSid: message.sid });
  })
  .catch((error) => {
    res.status(500).send({ success: false, error });
  });
});
//for fetching a particular techer data
app.get('/t_data', async (req, res) => {
    try {
        const  id  =  parseInt(req.query.id); // Extracting username from the query parameters
        const s_data = await Teacherdata.find({ id: id});
        res.json(s_data);
        console.log(s_data);
    } catch (error) {
        console.log("Error in fetching data", error);
        res.status(500).json({ error: "Error in fetching data" });
    }
});
//conection of the database
mongoose.connect('mongodb://localhost:27017/studentdata');
//Api creation
app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port" +port);
    }
    else{
        console.log("Error",+error);
    }
})

//databse creation for Studentdata
const studentdata = mongoose.model('studentmodel', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    classNumber: {
        type: Number,
        required: true,
    },
    Phoneno: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required:true,
       
    },
    Password:{
        type:String,
        required:true
    },
    RollNo: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});
app.get('/studentinfo', async (req, res) => {
    try {
      const id = parseInt(req.query.id); // Use query parameters instead of request body
      const data = await studentdata.find({ id: id });
      res.json(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
      res.status(500).json({ success: false, error: "Failed to fetch student data." });
    }
  });
app.post('/addstudent', async (req, res) => {
    try {
        const lastStudent = await studentdata.findOne().sort({ id: -1 });
        let id = 1;
        if (lastStudent) {
            id = lastStudent.id + 1;
        }

        const newStudent = new studentdata({
            id: id,
            name: req.body.name,
            image: req.body.image,
            classNumber: req.body.classNumber,
            RollNo: req.body.RollNo,
            Phoneno: '+91'+req.body.Phoneno,
            Password: '+91'+req.body.Phoneno,
        });

        await newStudent.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error saving student:", error);
        res.status(500).json({ success: false, error: "Failed to save student data." });
    }
});
//creating an api for fetching data for all students
app.put('/passwordupdate', async (req, res) => {
    try {
      const { password } = req.body;
  
      if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Replace 'yourUserId' with the actual logic to identify the user
      const data = await Student.findByIdAndUpdate('yourUserId', { Password: hashedPassword }, { new: true });
  
      if (!data) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(data);
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.get('/alldata', async (req, res) => {
    try {
      const studata = await studentdata.find({});
      res.json(studata);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });
  //creating an api for fetching data for all students
  app.get('/alldatateacher', async (req, res) => {
    try {
      const studata = await Teacherdata.find({});
      res.json(studata);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });
  //creating an api for fetching data according to student
  app.get('/studentdata', async (req, res) => {
    try {
        const  RollNo  = req.query.RollNo; // Extracting username from the query parameters
        const s_data = await studentdata.find({ RollNo: RollNo });
        res.json(s_data);
        console.log(s_data);
    } catch (error) {
        console.log("Error in fetching data", error);
        res.status(500).json({ error: "Error in fetching data" });
    }
});
//creating an api for fetching testdata according to the class
app.get('/testdata1', async (req, res) => {
    try {
        const classNumber = parseInt(req.query.classNumber, 10);
        if (isNaN(classNumber)) {
            return res.status(400).json({ message: 'Invalid class number' });
        }
        console.log('classNumber:', classNumber);

        const studentData1 = await Testdata.find({ classNumber: classNumber });
        console.log('Fetched Data:', studentData1); // Log the fetched data
        
        if (studentData1.length === 0) {
            console.log('No data found for classNumber:', classNumber);
        }

        res.json(studentData1);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
//creating an api for updating the student details


app.post('/updatestudent', async (req, res) => {
  try {
    // Extract the ID and other fields from the request body
    const { id, name, RollNo, classNumber, Phoneno } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Student ID is required' });
    }

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Student ID format' });
    }

    // Update student details
    const result = await studentdata.updateOne(
      { _id: id }, // Use _id to find the document
      {
        $set: {
          name,
          RollNo,
          classNumber,
          Phoneno
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Student not found or no changes made' });
    }

    // Send success response
    res.json({ status: 'ok', message: 'Student details updated successfully' });

  } catch (error) {
    // Log the error and send a response
    console.error('Error updating student details:', error);
    res.status(500).json({ error: 'Error updating student details: ' + error.message });
  }
});

  
//cretating an api for updating the class

app.post('/updateclass', async (req, res) => {
    const { classNumber } = req.body;
  
    if (!classNumber) {
      return res.status(400).json({ error: 'Class number is required' });
    }
  
    try {
      // Increment the class number
      const newClassNumber = parseInt(classNumber) + 1;
  
      // Find students in the current class
      const students = await studentdata.find({ classNumber });
  
      if (students.length > 0) {
        // Update each student's class number
        for (const student of students) {
          await studentdata.findByIdAndUpdate(student._id, { classNumber: newClassNumber });
          console.log(student._id);
        }
      }
  
      res.json({ message: 'Class updated successfully' });
    } catch (error) {
      console.error('Error updating class:', error);
      res.status(500).json({ error: 'Failed to update class' });
    }
  });

//creating an api for fetching data according to the classes
app.get('/classdata', async (req, res) => {
    try {
        const classNumber = parseInt(req.query.classNumber, 10);
    if (isNaN(classNumber)) {
  return res.status(400).json({ message: 'Invalid class number' });
            }
        console.log(classNumber);
        const studentData = await studentdata.find({ classNumber: classNumber });
        res.json(studentData);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
//remove student from data base
app.post('/removestudent',async(req,res)=>{
    await studentdata.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success:true,
        name:req.body.name
    })
})
//data fetching from the teacher


//model formation for teacherdata
const Teacherdata=mongoose.model('teachermodel',{
    id: {
        type:Number,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    phoneno: {
        type:String,
        required:true,
    },
    alternatephoneno:{
        type:String,
        required:true,
    },
    age :{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
})
app.post("/addteacher",async(req,res)=>{
    try {
        const lastTeacher = await Teacherdata.findOne().sort({ id: -1 });
        let id = 1;
        if (lastTeacher) {
            id = lastTeacher.id + 1;
        }

        const newTeacher = new Teacherdata({
            id: id,
            name: req.body.name,
            alternatephoneno: req.body.alternatephoneno,
            phoneno:req.body.phoneno,
            age: req.body.age,
            subject: req.body.subject,
            gender: req.body.gender,
            image: req.body.phoneno
           
            
            
        });

        await newTeacher.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error saving student:", error);
        res.status(500).json({ success: false, error: "Failed to save student data." });
    }  
})
app.get('/teacherdata',async(req,res)=>{
    try{
    const teacherdata=await Teacherdata.find({});
    res.json(teacherdata);
    }
    
    catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
})
//ExamResultdata
const Examdata=mongoose.model('Examdata',{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    RollNo:{
        type:String,
        required:true,
    },
    class:{
        type:String,
        required:true,
    },
   
    Subjects: {
        English: String,
        Hindi: String,
        Socialscience: String,
        Science: String,
        Math: String,
        subject6: String,
      },
})
app.post('/examdata', async (req, res) => {
    try {
        // Find the last exam entry to get the current highest id
        const lastexam = await Examdata.findOne().sort({ id: -1 });
        let id = 1;
        if (lastexam) {
            id = lastexam.id + 1;
        }

        // Create a new exam entry with the incremented id
        const newexam = new Examdata({
            id: id,
            name: req.body.name,
            RollNo: req.body.Rollno,
            class: req.body.class,
            Subjects: req.body.subjects, // Ensure this matches the form data
        });

        // Save the new exam entry to the database
        await newexam.save();

        // Send a success response
        res.status(201).json(newexam);
    } catch (error) {
        // Handle errors and send a response
        res.status(500).json({ error: error.message });
    }
})
//examdata for a student
app.get('/examstudent',async(req,res)=>{
    try {
        const  RollNo  =  req.query.RollNo; // Extracting username from the query parameters
        const exam_data = await Examdata.find({ RollNo: RollNo});
        res.json(exam_data);
        console.log(exam_data);
    } catch (error) {
        console.log("Error in fetching data", error);
        res.status(500).json({ error: "Error in fetching data" });
    }
})
//Testform data 

const Testdata = mongoose.model('testmodel', {
    id: {
        type: Number,
        required: true,
    },
    Subject: {
        type: String,
        required: true,
    },
    classNumber: {
        type: Number,  // Ensure this is a number
        required: true,
    },
    Totalmarks: {
        type: String,
        required: true,
    },
    Testdata: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

app.post('/testdata', async (req, res) => {
    const { subject, classNumber, totalMarks, testData } = req.body;
  
    try {
      const lastTest = await Testdata.findOne().sort({ id: -1 });
      let id = 1;
      if (lastTest) {
        id = lastTest.id + 1;
      }
  
      const newTest = new Testdata({
        id: id,
        Subject: subject,
        classNumber: classNumber,
        Totalmarks: totalMarks,
        Testdata: testData,
      });
  
      await newTest.save();
      console.log("Saved");
      res.json({
        success: true,
        id: id,
      });
    } catch (error) {
      console.error("Error saving test data:", error);
      res.status(500).json({ success: false, error: "Failed to save test data." });
    }
  });
  

app.post('/teacherremoved',async(req,res)=>{
    await Teacherdata.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success:true,
        name:req.body.name
    })
})
