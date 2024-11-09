// import React from 'react';
// import Header from "@/components/ui/Header";
// import SideBar from "@/components/ui/SideBar";

// const Dashboard = () => {
//   return (
//     <main>
//       <Header />
//       <SideBar />
//     </main>
//   );
// }

// export default Dashboard;

"use client"

import React, { useState } from 'react';
import WarningMessagePopup from "@/components/ui/WarningPopup";

const App = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleClosePopup = () => setShowPopup(false);

    return (
        <div>
            <button 
                onClick={() => setShowPopup(true)} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Show Warning
            </button>

            {showPopup && (
                <WarningMessagePopup 
                    title="Error Message"
                    description="This is a description of the error. Please take action to resolve it."
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default App;
