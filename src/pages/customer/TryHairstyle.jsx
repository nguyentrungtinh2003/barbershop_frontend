import { useRef, useState, useEffect } from "react";

const hairstyles = [
  "/hairstyles/style1.png",
  "/hairstyles/style2.png",

  "/hairstyles/style4.png",

  "/hairstyles/style7.png",
  "/hairstyles/style8.png",
  "/hairstyles/style9.png",
  "/hairstyles/style10.png",
  "/hairstyles/style11.png",
  "/hairstyles/style12.png",
];

export default function TryHairstyle() {
  const canvasRef = useRef(null);

  const [userImg, setUserImg] = useState(null);
  const [hairImg, setHairImg] = useState(null);

  const [hairPos, setHairPos] = useState({
    x: 100,
    y: 120,
    size: 200,
  });

  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    drawCanvas();
  }, [userImg, hairImg, hairPos]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (userImg) {
      ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height);
    }

    if (hairImg) {
      ctx.drawImage(
        hairImg,
        hairPos.x,
        hairPos.y,
        hairPos.size,
        hairPos.size * 0.7,
      );
    }
  };

  // ===== Upload user image =====
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => setUserImg(img);
  };

  // ===== Select hairstyle =====
  const selectHair = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => setHairImg(img);
  };

  // ===== Mouse events =====
  const handleMouseDown = (e) => {
    if (!hairImg) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (
      mouseX >= hairPos.x &&
      mouseX <= hairPos.x + hairPos.size &&
      mouseY >= hairPos.y &&
      mouseY <= hairPos.y + hairPos.size
    ) {
      setDragging(true);
      offset.current = {
        x: mouseX - hairPos.x,
        y: mouseY - hairPos.y,
      };
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setHairPos((prev) => ({
      ...prev,
      x: mouseX - offset.current.x,
      y: mouseY - offset.current.y,
    }));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl border border-yellow-500/20">
          <h2 className="text-2xl font-extrabold text-yellow-400 mb-6 tracking-wide">
            💈 TRY HAIRSTYLE
          </h2>

          {/* Upload */}
          <label className="block mb-4">
            <span className="text-sm text-zinc-400">Upload your photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="mt-2 block w-full text-sm
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:bg-yellow-400 file:text-black
          hover:file:bg-yellow-300 cursor-pointer"
            />
          </label>

          {/* Zoom */}
          <div className="my-6">
            <label className="text-sm text-zinc-400">Hair size</label>
            <input
              type="range"
              min="100"
              max="350"
              value={hairPos.size}
              onChange={(e) =>
                setHairPos({ ...hairPos, size: Number(e.target.value) })
              }
              className="w-full accent-yellow-400"
            />
          </div>

          {/* Hairstyles */}
          <div>
            <p className="text-sm text-zinc-400 mb-3">Choose hairstyle</p>
            <div className="grid grid-cols-3 gap-3">
              {hairstyles.map((hair) => (
                <div
                  key={hair}
                  className="bg-zinc-800 rounded-xl p-2 border border-transparent
              hover:border-yellow-400 transition cursor-pointer"
                  onClick={() => selectHair(hair)}
                >
                  <img
                    src={hair}
                    alt=""
                    className="w-full h-20 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - CANVAS */}
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl border border-yellow-500/20 flex flex-col items-center">
          <p className="text-yellow-400 font-semibold mb-3">
            Preview (drag hair to adjust)
          </p>

          <div className="bg-black p-3 rounded-xl border-4 border-yellow-400">
            <canvas
              ref={canvasRef}
              width={400}
              height={500}
              className="rounded cursor-move bg-zinc-800"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
