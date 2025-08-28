'use client'

import { useLanguage } from "@/hooks/useLanguage";

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <div className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full w-8 h-8 object-cover" alt="" src={img} />
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-700">
            {name}
          </div>
          <p className="text-xs font-medium text-gray-500">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-600">{body}</blockquote>
    </div>
  );
};

export function UserReviewsMarquee() {
  const { t } = useLanguage();
  
  const reviews = [
    {
      name: t('userReviews.reviews.0.name'),
      username: t('userReviews.reviews.0.role'),
      body: t('userReviews.reviews.0.content'),
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.1.name'),
      username: t('userReviews.reviews.1.role'),
      body: t('userReviews.reviews.1.content'),
      img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.2.name'),
      username: t('userReviews.reviews.2.role'),
      body: t('userReviews.reviews.2.content'),
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.3.name'),
      username: t('userReviews.reviews.3.role'),
      body: t('userReviews.reviews.3.content'),
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.4.name'),
      username: t('userReviews.reviews.4.role'),
      body: t('userReviews.reviews.4.content'),
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.5.name'),
      username: t('userReviews.reviews.5.role'),
      body: t('userReviews.reviews.5.content'),
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.6.name'),
      username: t('userReviews.reviews.6.role'),
      body: t('userReviews.reviews.6.content'),
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.7.name'),
      username: t('userReviews.reviews.7.role'),
      body: t('userReviews.reviews.7.content'),
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.8.name'),
      username: t('userReviews.reviews.8.role'),
      body: t('userReviews.reviews.8.content'),
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.9.name'),
      username: t('userReviews.reviews.9.role'),
      body: t('userReviews.reviews.9.content'),
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.10.name'),
      username: t('userReviews.reviews.10.role'),
      body: t('userReviews.reviews.10.content'),
      img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: t('userReviews.reviews.11.name'),
      username: t('userReviews.reviews.11.role'),
      body: t('userReviews.reviews.11.content'),
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    }
  ];

  // 将评价分成两行，每行6个
  const firstRow = reviews.slice(0, 6);
  const secondRow = reviews.slice(6, 12);

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-2xl">
          <span className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
            {t('userReviews.title')}
          </span>
        </h2>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto drop-shadow-lg">
          {t('userReviews.subtitle')}
        </p>
      </div>
      
      {/* 两行跑马灯容器 */}
      <div className="w-full space-y-8">
        {/* 第一行 - 向左滚动 */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left">
            {/* 第一组卡片 */}
            <div className="flex gap-4">
              {firstRow.map((review, index) => (
                <ReviewCard key={`first-${index}`} {...review} />
              ))}
            </div>
            {/* 第二组卡片（重复，创造无缝滚动） */}
            <div className="flex gap-4">
              {firstRow.map((review, index) => (
                <ReviewCard key={`first-repeat-${index}`} {...review} />
              ))}
            </div>
          </div>
        </div>
        
        {/* 第二行 - 向右滚动 */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right">
            {/* 第一组卡片 */}
            <div className="flex gap-4">
              {secondRow.map((review, index) => (
                <ReviewCard key={`second-${index}`} {...review} />
              ))}
            </div>
            {/* 第二组卡片（重复，创造无缝滚动） */}
            <div className="flex gap-4">
              {secondRow.map((review, index) => (
                <ReviewCard key={`second-repeat-${index}`} {...review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
