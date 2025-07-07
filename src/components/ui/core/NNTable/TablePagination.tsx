import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../button";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const page = parseInt(searchParams.get("page") || "1", 10);
        if (page && page <= totalPage) {
            setCurrentPage(page);
        }
    }, [searchParams, totalPage]);

    const updateQuery = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            updateQuery(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            updateQuery(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center gap-2 my-5">
            <Button
                onClick={handlePrev}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="w-8 h-8 rounded-full flex justify-center items-center"
            >
                <ArrowLeft />
            </Button>
            {[...Array(totalPage)].map((_, index) => (
                <Button
                    onClick={() => {
                        setCurrentPage(index + 1);
                        updateQuery(index + 1);
                    }}
                    key={index}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 rounded-full flex justify-center items-center hover:text-white hover:bg-secondary"
                >
                    {index + 1}
                </Button>
            ))}
            <Button
                onClick={handleNext}
                disabled={currentPage >= totalPage}
                variant="outline"
                size="sm"
                className="w-8 h-8 rounded-full flex justify-center items-center"
            >
                <ArrowRight />
            </Button>
        </div>
    );
};

export default TablePagination;
