type CardBoxProps = {
    title: string;
    badge?: string;
    description?: string;
    subtitle?: string;
    children: React.ReactNode;
};

export default function CardBox({ title, badge, description, subtitle, children }: CardBoxProps) {
    return (
        <div className="w-full rounded-xl bg-white p-6 shadow-md">
            {/* Title and Badge */}
            <div className="mb-2 flex flex-wrap items-center space-x-2">
                <h1 className="lg:text-xxl text-lg font-bold text-gray-800">{title}</h1>
                {badge && <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">{badge}</span>}
            </div>

            {/* Description */}
            {description && <p className="lg:text-md mb-4 text-sm text-gray-500">{description}</p>}

            {/* Subtitle */}
            {subtitle && <h2 className="text-md mb-4 font-semibold text-gray-800">{subtitle}</h2>}

            {/* Content */}
            {children}
        </div>
    );
}
