const  express  = require('express')  ; 
const  router =  express.Router()  ; 
const Task    = require('../models/Task')   ; 
const  authMiddleware = require('../middleware/authMiddleware')  ;  

// @route  POST api/task    
// @desc   Create a new  task  
// @access   Public 

router.post('/'  , authMiddleware  , async  (req  , res  )  => {
    try {
        const {title   , description  ,  status  , dueDate }  =  req.body     ;  
        const task  = new Task({
            title,
            description,
            status,
            dueDate,
            user: req.user.id // Assuming user ID is added to req.user by authMiddleware
    
        });  
        await  task.save() 
        res.status(200).json(task)  ;  

    }  catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }

}); 

// @route  GET api/tasks  
// @desc   Get all tasks  
// @access   Public 

router.get('/',  authMiddleware ,  async   (req  , res  )  => {
    try {
        const tasks = await  Task.find({ user: req.user.id });  

        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }

    res.json(task);

    }  catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/tasks/:id
// @desc   Get  task by ID  
// @access   Public 

router.get('/:id'  , authMiddleware  ,  async  (req  , res  )  => {
    try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
      
});

// @route  PUT api/tasks/:id
    // @desc   Update  task by ID  
    // @access   Private (authenticated)

router.put('/:id'  , authMiddleware  , async   (req  , res  )  => {
    const { title, description, status, dueDate } = req.body;

  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (status) taskFields.status = status;
  if (dueDate) taskFields.dueDate = dueDate;

  try {
    let task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  } 
});

// @route  DELETE api/tasks/:id
    // @desc   Delete  task by ID  
    // @access   Private (authenticated)

router.delete('/:id'  , authMiddleware  , async  (req  , res  )  => {
    try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.remove();

    res.json({ msg: 'Task removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  } 
});

module.exports =  router ;  