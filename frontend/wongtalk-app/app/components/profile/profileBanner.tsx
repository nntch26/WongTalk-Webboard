
export const ProfileBanner = ({ bannerUrl }: { bannerUrl: string }) => (
    <div className="h-32 sm:h-48 bg-[#0F151A] relative">
        <img
            src={bannerUrl}
            alt="banner image"
            className="w-full h-full object-cover"
        />
    </div>
);
