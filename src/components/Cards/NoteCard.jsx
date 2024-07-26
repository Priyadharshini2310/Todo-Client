import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from 'moment';

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  image,
}) => {
  
    // Log image prop
    console.log('Image prop in NoteCard:', image);

    // Normalize path
    const normalizedImagePath = image ? image.replace(/\\/g, '/') : '';
    console.log('Normalized image path:', normalizedImagePath);

    // Construct image URL
    const imageUrl = normalizedImagePath ? `http://localhost:3000/${normalizedImagePath}` : '';
    console.log('Image URL:', imageUrl);
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
        </div>

        <MdOutlinePushPin className={`role: button icon-button ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      {image && (
        <div className="mt-2">
          <img
            src={imageUrl} // Correct the URL path
            alt="Note"
            className="w-full h-40 object-cover rounded"
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags.map((item) => `#${item}`).join(' ')}</div>

        <div className="flex items-center gap-2">
          <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
          <MdDelete className="icon-btn hover:text-red-500" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
