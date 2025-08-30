import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <img src="/logo.jpeg" alt="Logo" className="h-14 w-14 rounded-xl mb-3" />
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} EduStream. All rights reserved.
          </p>
        </div>

        {/* Quick Links & Resources */}
        <div className="flex justify-between md:justify-around">
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/home" className="hover:text-white">Home</Link></li>
              <li><Link to="/playlist" className="hover:text-white">Courses</Link></li>
              <li><Link to="/videos" className="hover:text-white">Videos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/support" className="hover:text-white">Support</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
          <p className="text-sm">Email: support@edustream.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>
      </div>
    </footer>
  );
}
