import { useRef, useState, useEffect } from "react";

export default function CanvasDraw({ onGenerate, loading }) {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    // Make canvas responsive to screen size initially
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const parent = canvas.parentElement;
            const size = Math.min(parent.clientWidth - 32, 400); // 400 max, or screen width minus padding
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        let clientX = e.clientX;
        let clientY = e.clientY;
        
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const startDrawing = (e) => {
        e.preventDefault(); // Prevent scrolling on touch
        const coords = getCoordinates(e.nativeEvent || e);
        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
        setDrawing(true);
    };

    const draw = (e) => {
        if (!drawing) return;
        e.preventDefault();
        
        const coords = getCoordinates(e.nativeEvent || e);
        const ctx = canvasRef.current.getContext("2d");
        
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
    };

    const stopDrawing = () => setDrawing(false);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const getImageData = () => {
        // Create an off-screen canvas with a pure white background 
        // to ensure transparency doesn't break image generation in backend
        const canvas = canvasRef.current;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        
        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, canvas.width, canvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        
        return tempCanvas.toDataURL("image/png");
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
            <div className="relative group w-full flex justify-center">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white shadow-inner cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>

            <div className="flex w-full gap-4">
                <button
                    onClick={clearCanvas}
                    disabled={loading}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                    Clear
                </button>

                <button
                    onClick={() => onGenerate(getImageData())}
                    disabled={loading}
                    className="flex-[2] bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {loading ? (
                        <>
                            <span className="animate-spin text-xl">💫</span> Analyzing your creation...
                        </>
                    ) : (
                        <>✨ Morph It</>
                    )}
                </button>
            </div>
        </div>
    );
}