class Features{
    constructor(query,querystr)
    {
        this.query=query;
        this.querystr=querystr; 
    }
    search()
    {
        const keyword=this.querystr.keyword?{
            name:{
                $regex:this.querystr,
                $options:"i",
            },
        }:{};
    }
}

module.exports=Features