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
                $regex:this.querystr.keyword,
                $options:"i",
            },
        }:{};
   
        this.query=this.query.find({...keyword});
        return this; 
    }
    filter(){
        const querycopy={...this.querystr};
      
        //removing fields to get catagory
        const removefields=["keyword","page","limit"];
        removefields.forEach((key)=>delete querycopy[key]);
        // filter for range in price and rating

        let querystr=JSON.stringify(querycopy);
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
        this.query=this.query.find(JSON.parse(querystr));
        
        return this;
    }
    pagination(elementperpage){
        const currentpage=Number(this.querystr.page)||1;
        const skip=elementperpage*(currentpage-1);
        this.query=this.query.limit(elementperpage).skip(skip);
        return this;
    }
}

module.exports=Features