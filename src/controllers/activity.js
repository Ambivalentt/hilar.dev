import Activity from "../repositories/recentActivity.js";

const recentActivity = async (req,res)=>{
    try{
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const {id} = req.params;
        const results = await Activity.getRecently({ project_id: id })
        res.status(200).json({ message: 'Recent activity fetched successfully', data: results });
    }catch(error){
        res.status(400).json({ message: 'Internal server error', error: error.message });
    }
}

export { recentActivity };