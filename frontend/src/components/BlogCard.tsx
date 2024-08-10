
interface BlogCardProps {
  title: string;
  content: string;
  date: string;
  id: string;
  authorName: string
  onClick: (e: any) => void
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  date,
  authorName,
  onClick,
}) => {

  return (
    <div onClick={onClick} className="max-w-2xl mx-auto overflow-hidden border-b-2 m-6 cursor-pointer">
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full mr-4 bg-slate-500 text-center flex justify-center pt-2">{authorName[0].toUpperCase()}</div>
          <div className="text-sm">
            <p className="text-gray-950 font-semibold">{authorName}</p>
            <p className="text-gray-600">{date}</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{content.length < 100 ? content : content.slice(0, 164) + "..." }</p>
      </div>
    </div>
  );
};
