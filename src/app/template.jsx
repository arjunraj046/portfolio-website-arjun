import ScrollProgress from "@/components/layout/ScrollProgress"

// wraps every page: a CSS fade-in on navigation (it needs no JavaScript,
// so content is never stuck hidden) + the scroll progress bar
const Template = ({ children }) => (
    <>
        <div className="animate-in fade-in duration-300 motion-reduce:animate-none">
            {children}
        </div>
        <ScrollProgress />
    </>
)

export default Template
