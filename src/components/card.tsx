import { User } from "next-auth";

interface CardProps {
    user: User,
    elo: number,
    w: number,
    h: number,
}

export function ELOCard({ user , elo, w, h }: CardProps){
    return (
        <div className={`w-full w-${w} h-${h} mx-auto border rounded-lg overflow-hidden bg-white mt-6`}>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center font-bold py-3">
                {user?.name}
            </div>
            {/* Image Section */}
            <div className="bg-indigo-50 flex justify-center items-center py-10">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex justify-center items-center border-4 border-indigo-500 shadow-md">
                    {
                        (elo < 1000)
                            ? <img src="Ranks/g2.png" className="w-full h-full object-cover" />
                            : <>
                                {
                                    (elo < 1500)
                                        ? <img src="Ranks/g3.png" className="w-full h-full object-cover" />
                                        : <img src="Ranks/champ.png" className="w-full h-full object-cover" />
                                }
                            </>
                    }
                </div>
            </div>
            {/* Stats Section */}
            <div className="bg-gray-100 text-gray-800 p-6">
                <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Matches Played</span>
                    <span className="text-indigo-600 font-bold">10</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Matches Won</span>
                    <span className="text-green-600 font-bold">7</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Matches Lost</span>
                    <span className="text-red-600 font-bold">3</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">ELO</span>
                    <span className="text-purple-600 font-bold">{elo}</span>
                </div>
            </div>
        </div>
    );
}