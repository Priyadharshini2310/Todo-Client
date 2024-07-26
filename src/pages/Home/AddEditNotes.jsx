import  React ,{ useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose,MdDelete } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
const AddEditNotes = ({noteData, getAllNotes, type, onClose, showToastMessage}) => {
        const [title, setTitle] = useState(noteData?.title||"");
        const [content, setContent] = useState(noteData?.content||"");
        const [tags, setTags] = useState(noteData?.tags||[]);
        const [image, setImage] = useState(null);
        const [imageFile, setImageFile] = useState(null); 
        const [error,setError] = useState(null);
        
        //add new note
        const addNewNote = async () => {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('content', content);
          formData.append('tags', JSON.stringify(tags));
          if (imageFile) {
              formData.append('image', imageFile); // Append image file
          }
      
          try {
              const response = await axiosInstance.post('/add-note', formData, {
                  headers: { 'Content-Type': 'multipart/form-data' }
              });
              if (response.data && response.data.note) {
                  showToastMessage("Note Added Successfully.");
                  getAllNotes();
                  onClose();
              }
          } catch (error) {
              if (error.response && error.response.data && error.response.data.message) {
                  setError(error.response.data.message);
              }
          }
      };
      

        //edit note
        const editNote = async()=>{
          const noteId = noteData._id;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', JSON.stringify(tags));
        if (imageFile) {
            formData.append('image', imageFile); // Append image file
        }

        try {
            const response = await axiosInstance.put(`/edit-note/${noteId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully.");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
        };

        const handleAddNote = () =>{
            if (!title) {
            setError("Please enter the title");
            return;
            }
            if (!content) {
            setError("Please enter the content");
            return;
            }
            setError("");
            if(type==='edit'){
                editNote();
            }
            else{
                addNewNote();
            }
        };
        ///image func
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result); // Set Base64 data URL
                setImageFile(file); // Store file object
              };
              reader.readAsDataURL(file);
          }
      };
        const handleRemoveImage = () => {
          setImage(null);
        };
      
  return (
    <div className='relative overflow-auto max-h-[80vh]'>
        <button className='w-3 h-10  rounded-full items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500' onClick={onClose}>
            <MdClose className='text-xl text-slate-400'/>
        </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text" 
        className='text-2xl text-slate-950 outline-none'
        placeholder='Going to Gym at 5'
        value={title}
        onChange={({target})=>setTitle(target.value)}
          />
       
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
         placeholder='CONTENT'
          rows={10}
          value={content}
          onChange={({target})=>setContent(target.value)}></textarea>
      </div>
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>
      <div className='mt-3'>
        <label className='input-label'>IMAGE</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className='file-input'
        />
        {image && (
                    <div className='mt-2'>
                        <img src={image} alt="Note" className="w-full h-40 object-cover rounded" />
                        <MdDelete
                            className='text-red-500 cursor-pointer'
                            onClick={handleRemoveImage}
                            title='Remove Image'
                        />
                    </div>
                )}
                {!image && <p>No file chosen</p>}
      </div>
      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
      <button className='w-full btn-primary font-medium p-3 mt-5' onClick={handleAddNote} >{type==="edit"? "UPDATE":"ADD"}</button>
    </div>
  )
}

export default AddEditNotes
