import { Search, ShoppingCart, Plane, Laptop } from "lucide-react";

const QuickActions = () => {

    const actions = [

        {
            title: "Compare Prices",
            icon: <ShoppingCart size={24} />
        },

        {
            title: "Search Web",
            icon: <Search size={24} />
        },

        {
            title: "Book Flights",
            icon: <Plane size={24} />
        },

        {
            title: "Research Laptop",
            icon: <Laptop size={24} />
        }

    ];

    return (

        <div>

            <h2 className="text-white text-2xl font-semibold mb-6">

                Quick Actions

            </h2>

            <div className="grid lg:grid-cols-4 gap-6">

                {actions.map((action) => (

                    <button

                        key={action.title}

                        className="bg-[#141414] hover:bg-[#1B1B1B] border border-[#2A2A2A] rounded-2xl p-8 text-left transition"

                    >

                        <div className="text-[#D4AF37]">

                            {action.icon}

                        </div>

                        <h3 className="text-white mt-6 text-lg font-semibold">

                            {action.title}

                        </h3>

                    </button>

                ))}

            </div>

        </div>

    );

};

export default QuickActions;