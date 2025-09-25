import ProfileAchievements from "./ProfileAchievements";

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  user,
  setUser
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setUser: (user: any) => void;
  user: any;
}) {
  return (
    <div className="mt-20">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <ul className="flex space-x-6">
          {["details", "achievements", "settings"].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer py-2 px-3 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
        {activeTab === "details" && (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Mobile:</strong> {user.mobile || "N/A"}
            </p>
            <p>
              <strong>Designation:</strong> {user.designation || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            {user.role === "teacher" && (
              <p>
                <strong>Subjects:</strong> {user.subjects || "N/A"}
              </p>
            )}
            {user.role === "student" && (
              <p>
                <strong>Grade:</strong> {user.grade || "N/A"}
              </p>
            )}
          </div>
        )}

        {activeTab === "achievements" && (
         
            <ProfileAchievements user={user} setUser={setUser} />
        )}

        {activeTab === "settings" && <p>Settings tab content here...</p>}
      </div>
    </div>
  );
}
