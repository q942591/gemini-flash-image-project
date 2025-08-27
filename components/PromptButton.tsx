interface PromptButtonProps {
  title: string
  onClick: () => void
  isSelected?: boolean
  beforeImage: string
  afterImage: string
}

export default function PromptButton({
  title,
  onClick,
  isSelected = false,
  beforeImage,
  afterImage
}: PromptButtonProps) {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        className={`relative h-32 w-full rounded-lg overflow-hidden transition-all hover:shadow-lg group ${
          isSelected 
            ? "ring-2 ring-purple-500 ring-offset-2" 
            : "hover:ring-2 hover:ring-purple-300 hover:ring-offset-1"
        }`}
      >
        {/* Before/After Background Images */}
        <div className="absolute inset-0 flex">
          {/* Before Image (Left Half) */}
          <div 
            className="w-1/2 bg-cover bg-center brightness-125"
            style={{ backgroundImage: `url(${beforeImage})` }}
          />
          {/* After Image (Right Half) */}
          <div 
            className="w-1/2 bg-cover bg-center brightness-125"
            style={{ backgroundImage: `url(${afterImage})` }}
          />
        </div>
        
        {/* Divider Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/80 transform -translate-x-0.5" />
        
        {/* Overlay */}
        <div className={`absolute inset-0 transition-all ${
          isSelected 
            ? "bg-purple-600/10" 
            : "bg-black/20 group-hover:bg-black/10"
        }`} />
        
        {/* Before/After Labels */}
        <div className="absolute bottom-1 left-1 text-xs text-white/90 bg-black/60 px-2 py-1 rounded">
          Before
        </div>
        <div className="absolute bottom-1 right-1 text-xs text-white/90 bg-black/60 px-2 py-1 rounded">
          After
        </div>
      </button>
      
      {/* Title below the image */}
      <div className="mt-3 text-center">
        <h3 className={`font-medium text-sm ${
          isSelected ? "text-purple-600" : "text-gray-700"
        }`}>
          {title}
        </h3>
      </div>
    </div>
  )
}