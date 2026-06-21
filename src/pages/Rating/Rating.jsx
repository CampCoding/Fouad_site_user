import React, { useState } from 'react';
import {
    Star,
    Building2,
    Video,
    Upload,
    Send,
    X,
} from 'lucide-react';

const RATING_OPTIONS = [
    {
        id: 1,
        name: 'قيم عبر فيسبوك',
        icon: () => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
            </svg>
        ),
        type: 'external',
        link: 'https://www.facebook.com/fouady.center/reviews',
        color: '#1877F2',
    },
    {
        id: 2,
        name: 'قيم عبر جوجل',
        icon: () => (
            <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
            </svg>
        ),
        type: 'external',
        // ⚠️ ضع هنا لينك Google Review الخاص بالمركز
        link: 'https://search.google.com/local/writereview?placeid=ChIJXXXXXXXXXXXXX',
        color: '#fff',
    },
    {
        id: 3,
        name: 'تقييم زيارة في الفرع',
        icon: Building2,
        type: 'branch',
        color: '#d49a3e',
    },
    {
        id: 4,
        name: 'مشاركة فيديو أو قصة نجاح',
        icon: Video,
        type: 'story',
        color: '#d49a3e',
    },
];
export default function Rating() {
    const [activeModal, setActiveModal] = useState(null);

    const [branchRating, setBranchRating] = useState(0);
    const [branchHover, setBranchHover] = useState(0);
    const [branchMessage, setBranchMessage] = useState('');

    const [storyMessage, setStoryMessage] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState('');

    const handleOptionClick = (option) => {
        if (option.type === 'external') {
            window.open(option.link, '_blank');
            return;
        }
        setActiveModal(option.type);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const removeVideo = () => {
        setVideoFile(null);
        setVideoPreview('');
    };
    const handleBranchSubmit = () => {
        if (branchRating === 0) {
            toast.error('من فضلك اختر تقييم بالنجوم');
            return;
        }

        console.log('Branch Rating:', { rating: branchRating, message: branchMessage });
        toast.success('شكرًا لتقييمك! 🌟');

        setBranchRating(0);
        setBranchMessage('');
        setActiveModal(null);
    };

    const handleStorySubmit = () => {
        if (!storyMessage.trim() && !videoFile) {
            toast.error('من فضلك اكتب قصتك أو ارفع فيديو');
            return;
        }

        console.log('Story:', { message: storyMessage, video: videoFile });
        toast.success('شكرًا لمشاركتك قصتك معنا! ❤️');

        setStoryMessage('');
        setVideoFile(null);
        setVideoPreview('');
        setActiveModal(null);
    };

    return (
        <div className="py-10 mx-auto">
            <div className="card mb-6">
                <Star size={40} className="text-(--main-color)" />
                <p className="font-bold text-[17px] text-[#eee]">التقييم</p>
            </div>

            <div className="flex flex-col gap-[9.5px] px-1">
                {RATING_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className="flex items-center justify-between gap-3 p-3 border border-(--main-color) rounded-md bg-[#171717] hover:bg-white/5 transition-colors w-full"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-[40px] h-[40px] rounded-md flex items-center justify-center bg-[#0d0d0d]">
                                    <Icon size={22} style={{ color: option.color }} />
                                </div>
                                <p className="text-white font-bold text-[14px]">{option.name}</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {activeModal === 'branch' && (
                <Modal onClose={() => setActiveModal(null)} title="تقييم زيارة في الفرع">
                    <div className="flex flex-col gap-4">
                        <p className="text-white text-[13px] text-center">كيف كانت تجربتك معنا؟</p>

                        <div className="flex justify-center gap-2" dir="ltr">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setBranchHover(star)}
                                    onMouseLeave={() => setBranchHover(0)}
                                    onClick={() => setBranchRating(star)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={32}
                                        className={`${(branchHover || branchRating) >= star
                                            ? 'fill-(--main-color) text-(--main-color)'
                                            : 'text-white/30'
                                            } transition-colors`}
                                    />
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={branchMessage}
                            onChange={(e) => setBranchMessage(e.target.value)}
                            placeholder="اكتب رأيك (اختياري)"
                            rows={4}
                            className="w-full p-3 bg-[#0d0d0d] border border-(--main-color) rounded-md text-white text-[13px] outline-none resize-none placeholder:text-white/40"
                        />

                        <button
                            onClick={handleBranchSubmit}
                            className="flex items-center justify-center gap-2 h-[38px] !bg-(--dark-gray) border border-(--main-color) rounded-md text-white text-[13px] font-bold hover:bg-(--main-color)/10 transition-colors"
                        >
                            <Send size={16} />
                            إرسال التقييم
                        </button>
                    </div>
                </Modal>
            )}

            {activeModal === 'story' && (
                <Modal onClose={() => setActiveModal(null)} title="شارك قصتك معنا">
                    <div className="flex flex-col gap-4">
                        <p className="text-white text-[13px] text-center">
                            يسعدنا أن تشاركنا قصة نجاحك
                        </p>

                        {!videoPreview ? (
                            <label className="flex flex-col items-center justify-center gap-2 p-6 border border-dashed border-(--main-color) rounded-md cursor-pointer hover:bg-white/5 transition-colors">
                                <Upload size={28} className="text-(--main-color)" />
                                <p className="text-white text-[13px]">رفع فيديو (اختياري)</p>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="relative">
                                <video
                                    src={videoPreview}
                                    controls
                                    className="w-full rounded-md border border-(--main-color)"
                                />
                                <button
                                    onClick={removeVideo}
                                    className="absolute top-2 left-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-black"
                                >
                                    <X size={16} className="text-white" />
                                </button>
                            </div>
                        )}

                        <textarea
                            value={storyMessage}
                            onChange={(e) => setStoryMessage(e.target.value)}
                            placeholder="اكتب قصتك أو رسالتك..."
                            rows={5}
                            className="w-full p-3 bg-[#0d0d0d] border border-(--main-color) rounded-md text-white text-[13px] outline-none resize-none placeholder:text-white/40"
                        />

                        <button
                            onClick={handleStorySubmit}
                            className="flex items-center justify-center gap-2 h-[38px] !bg-(--dark-gray) border border-(--main-color) rounded-md text-white text-[13px] font-bold hover:bg-(--main-color)/10 transition-colors"
                        >
                            <Send size={16} />
                            مشاركة القصة
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

function Modal({ children, onClose, title }) {
    return (
        <div
            className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#171717] border border-(--main-color) rounded-lg w-full max-w-[400px] max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between p-4 border-b border-(--main-color)/30">
                    <p className="text-white font-bold text-[15px]">{title}</p>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>

                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}