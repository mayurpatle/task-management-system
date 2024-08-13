const  express  = require('express')  ; 
const  router =  express.Router()  ; 

// @route  POST api/task    
// @desc   Create a new  task  
// @access   Public 

router.post('/'  ,  (req  , res  )  => {
    res.send('create  a  new  task  ')   ;  

}); 

// @route  GET api/tasks  
    // @desc   Get all tasks  
    // @access   Public 

router.get('/',  (req  , res  )  => {
    res.send('get  all  tasks  ')   ;  
});

// @route  GET api/tasks/:id
    // @desc   Get  task by ID  
    // @access   Public 

router.get('/:id'  ,  (req  , res  )  => {
    res.send(`get  task  by  id  :  ${req.params.id}  `)   ;  
});

// @route  PUT api/tasks/:id
    // @desc   Update  task by ID  
    // @access   Private (authenticated)

router.put('/:id'  ,  (req  , res  )  => {
    res.send(`update  task  by  id  :  ${req.params.id}  `)   ;  
});

// @route  DELETE api/tasks/:id
    // @desc   Delete  task by ID  
    // @access   Private (authenticated)

router.delete('/:id'  ,  (req  , res  )  => {
    res.send(`delete  task  by  id  :  ${req.params.id}  `)   ;  
});

module.exports =  router ;  