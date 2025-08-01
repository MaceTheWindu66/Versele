import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md fixed w-full z-1 top-0 left-0">
            <div className="max-w-8xl mx-auto px-6 py-4 flex justify-between items-center">
                <div>
                    <a href="#" className="font-semibold hover:text-blue-600 font-mono">
                        Versle
                    </a>
                </div>
                <div>
                    <a href="#" className="font-semibold hover:text-blue-600 font-mono">
                        Login
                    </a>
                </div>
            </div>
        </nav>
    );
}
export default Navbar