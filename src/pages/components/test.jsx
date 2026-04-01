<li
  className="relative cursor-pointer h-full flex items-center py-4 text-pink-900 hover:text-pink-600 transition"
  onMouseEnter={() => setActivitiesOpen(true)}
  onMouseLeave={() => setActivitiesOpen(false)}
>
  <span className="hover:text-blue-600">Activities</span>

  {activitiesOpen && (
    <div className="absolute right-0 top-full pt-3 w-max z-50 animate-fadeSlideSlow">
      <div className="bg-pink-100/90 shadow-2xl border rounded-lg p-8 grid grid-cols-3 gap-0">
        {/* Column 1 */}
        <div className="px-6 border-r border-gray-200">
          <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
            Sports
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="hover:text-blue-600 whitespace-nowrap">Cricket</li>
            <li className="hover:text-blue-600 whitespace-nowrap">Athletics</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="px-6 border-r border-gray-200">
          <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
            Cultural
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="hover:text-blue-600 whitespace-nowrap">Dance</li>
            <li className="hover:text-blue-600 whitespace-nowrap">Music</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="px-6">
          <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
            Clubs
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="hover:text-blue-600 whitespace-nowrap">Eco Club</li>
            <li className="hover:text-blue-600 whitespace-nowrap">
              Science Club
            </li>
          </ul>
        </div>
      </div>
    </div>
  )}
</li>;
