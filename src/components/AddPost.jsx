import React, { useEffect, useState } from 'react'
import { addPost, updatePost } from '../api/PostApi';

const AddPost = ({data,setData,updateDataApi,setUpdateDataApi}) => {
 const [addData,setAddData] = useState({
    title:"",
    body:""
 })
  
 let isEmpty = Object.keys(updateDataApi).length === 0;

 useEffect(()=>{
    updateDataApi && setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || ""
    })
 },[updateDataApi]);

 const handleInputChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prevData)=>{
        return {
            ...prevData,
            [name]:value
        }
    })

 }
 
 const addPostData = async ()=>{
      const res =   await addPost(addData);
      if(res.status === 201){
        setData([...data,res.data])
        setAddData({title:"",body:""})
      }
 }

 const updatePostData = async ()=>{
      const res =   await updatePost(updateDataApi.id,addData);
      if(res.status === 200){
        setData((prev)=>{
            return prev.map((curElem)=>{
                return curElem.id === res.data.id ? res.data : curElem
            })
        })

        setAddData({title:"",body:""})
        setUpdateDataApi({})
      }
 }

 const handleOnSubmit = (e)=>{
   e.preventDefault();
   const action = e.nativeEvent.submitter.value;
   if(action === "Add"){
    addPostData();
   }else if(action === "Edit"){
    updatePostData();       
   }   
 }
 
  return (
    <form onSubmit={handleOnSubmit}>
    <div>
      <label htmlFor="title">Title</label>
      <input type="text" name='title' id='title' placeholder='Enter Title' value={addData.title} onChange={handleInputChange} />
    </div>

    <div>
      <label htmlFor="body">Body</label>
      <input type="text" name='body' id='body' placeholder='Enter Body' value={addData.body} onChange={handleInputChange}/>
    </div>
    <button type='submit' value={isEmpty ? "Add" : "Edit" }>{isEmpty ? "Add" : "Edit" }</button>
    </form>
  )
}

export default AddPost
