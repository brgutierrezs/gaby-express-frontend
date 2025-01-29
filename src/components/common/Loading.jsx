import { Loader2 } from "lucide-react";
import PropTypes from 'prop-types';

const Loading = ({ message, size = "default" }) => {
    const sizeClasses = {
        small: "h-4 w-4",
        default: "h-6 w-6",
        large: "h-8 w-8"
    };

    if (!message) {
        message = "Cargando...";
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 gap-3  h-screen">
            <div className="relative flex items-center gap-2">
                <Loader2 className={`animate-spin ${sizeClasses[size]} text-blue-600`} />
                <span className="text-slate-700 font-medium">{message}</span>
            </div>
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[loading_1s_ease-in-out_infinite]"
                    style={{
                        width: '30%',
                        animation: 'loading 1s ease-in-out infinite'
                    }}
                />
            </div>
            <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
        </div>
    );
};
Loading.propTypes = {
    message: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default', 'large'])
};


export default Loading;