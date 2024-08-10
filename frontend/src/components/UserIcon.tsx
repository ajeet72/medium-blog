export const UserIcon = ({name}: {name: string}) => {
    return <div className="flex justify-center text-center">
        <div className="flex justify-center w-8 h-8 bg-slate-400 rounded-full text-center pt-1 mr-4">
            {name[0].toUpperCase()}
        </div>
    </div>
}