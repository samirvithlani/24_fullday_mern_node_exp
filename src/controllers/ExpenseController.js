const expenseSchema = require("../models/ExpenseModel")

const createExpense = async(req,res)=>{


    try{

        const userId = req.user._id;
        const savedExpense = await expenseSchema.create({...req.body,userId:userId})
        res.status(201).json({
            message:"expense created..",
            data:savedExpense
        })


    }catch(err){

        res.status(500).json({
            message:"error while creating expense.."
        })
    }


}
const getExpesneByUserId = async(req,res)=>{

    const userId = req.user._id;
    var sort = req.query.sort || 1;
    sort = parseInt(sort);
    var datesort = req.query.date || 1
    datesort = parseInt(datesort);
    console.log(datesort)
    const expenses = await expenseSchema.find({userId:userId}).populate("expCat").sort({amount:sort,expenseDate:datesort})
    console.log(
            expenses.map(e => e.expenseDate)
        );
    res.status(200).json({
        message:"expense",
        data:expenses
    })
}

const searchExp = async(req,res)=>{
    const userId = req.user._id;
    const expName = req.query.expName || "";
    var expamount = req.query.expamount || "";
    if(expamount){
        expamount = parseInt(expamount);
    }

    
    try{
        const foundexp = await expenseSchema.find({
            userId: userId,
            $or:[
                { title: { $regex: expName, $options: 'i' } },
                 { description: { $regex: expName, $options: 'i' } },
            ]
        }).populate("expCat")

        res.json({
            message: "search successful",
            data: foundexp
        })  
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "error while searching expense" })
    }
}


const uploadReceipt = async(req,res)=>{

    const expId = req.body.expId;
    const file = req.file;
    //clodudiary upload --> req.file.path
    //return cloudinaryResponse --> secure_url
    const updateExp = await expenseSchema.findByIdAndUpdate(expId,{expReceipt:file.path})
    res.status(200).json({
        message:"receipt uploaded successfully",
        data:updateExp
    })


}

const deleteExpense = async(req,res)=>{
    //karo jate.
}




module.exports={
    createExpense,
    getExpesneByUserId,
    searchExp,
    uploadReceipt
}