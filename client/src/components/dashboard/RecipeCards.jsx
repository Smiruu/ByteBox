import { Clock, Users } from "lucide-react";

export default function RecipeCard({
  image,
  priority = "Medium Priority",
  title,
  description,
  time,
  servings,
  difficulty,
  whyNow,
  ingredients = [],
  onViewRecipe,
}) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border">
      {/* Content Section */}
      <div className="p-4 space-y-3">
        <div>
          <h2 className="font-bold text-lg text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <div className="flex items-center gap-1">
            <Clock size={16} /> {time}
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} /> {servings}
          </div>
          <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">
            {difficulty}
          </span>
        </div>

        {/* Why Now */}
        {whyNow && (
          <div className="bg-gray-100 text-gray-700 text-sm px-3 py-2 rounded-md">
            <span className="font-semibold">Why now:</span> {whyNow}
          </div>
        )}

        {/* Ingredients */}
        <div>
          <h3 className="font-semibold text-sm text-gray-800">Ingredients:</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            {ingredients.slice(0, 3).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
            {ingredients.length > 3 && (
              <li className="text-blue-600 cursor-pointer">
                + {ingredients.length - 3} more
              </li>
            )}
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={onViewRecipe}
          className="w-full bg-gray-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}
