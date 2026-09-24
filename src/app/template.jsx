import ScrollProgress from "@/components/layout/ScrollProgress"

const Template = ({ children }) => (
    <>
        <div className="animate-in fade-in duration-300 motion-reduce:animate-none">
            {children}
        </div>
        <ScrollProgress />
    </>
)

export default Template
