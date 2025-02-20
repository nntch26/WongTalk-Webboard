import Link from "next/link";
import styles from "./styles/Sidebar.module.css";

export default function Sidebar() {
    return (
        <>
            {/* <!-- Sidenav --> */}
            <div
                id="sidenav"
                className={`${styles.sidebarcus} sidebar-cus fixed top-20 left-0 h-full w-64  z-40 transform md:translate-x-0 -translate-x-full transition-transform duration-300 ease-in-out`}
            >
                <div className="overflow-y-auto h-full">
                    {/* <!-- หน้าแรก --> */}
                    <div className="px-3 py-4">
                        <div className="space-y-2">
                            <Link href="/" className={styles.sidenavitem}>
                                <i className="fa-regular fa-comment-dots mr-3"></i>
                                <span>My Feed</span>
                            </Link>
                            <Link
                                href={"/latest"}
                                className={styles.sidenavitem}
                            >
                                <i className="fa-solid fa-fire mr-3"></i>
                                <span>New Posts</span>
                            </Link>
                            <Link href="#" className={styles.sidenavitem}>
                                <i className="fa-solid fa-arrow-up-right-dots mr-3"></i>
                                <span>Top Posts</span>
                            </Link>
                            <Link href="#" className={styles.sidenavitem}>
                                <i className="fas fa-star mr-3"></i>
                                <span>Following</span>
                            </Link>
                        </div>
                    </div>

                    <hr className="border-gray-700" />

                    {/* <!-- อันที่ติดตามไว้ --> */}
                    <div className="px-3 py-4">
                        <h3 className="px-3 text-sm font-medium text-gray-400">
                            Following
                        </h3>
                        <div className="space-y-2 mt-4">
                            <Link
                                href="#"
                                className="px-3 py-2 topic-item w-full flex items-center "
                            >
                                <i className="fa-regular fa-comments text-base md:text-l"></i>
                                <span className="text-xs md:text-sm text-center ml-2">
                                    {" "}
                                    General
                                </span>
                            </Link>

                            <Link
                                href="#"
                                className="px-3 py-2 topic-item w-full flex items-center "
                            >
                                <i className="fa-regular fa-comments text-base md:text-l"></i>
                                <span className="text-xs md:text-sm text-center ml-2">
                                    {" "}
                                    General
                                </span>
                            </Link>

                            <Link
                                href="#"
                                className="px-3 py-2 topic-item w-full flex items-center "
                            >
                                <i className="fa-regular fa-comments text-base md:text-l"></i>
                                <span className="text-xs md:text-sm text-center ml-2">
                                    {" "}
                                    General
                                </span>
                            </Link>

                            <Link
                                href="#"
                                className="px-3 py-2 topic-item w-full flex items-center "
                            >
                                <i className="fa-regular fa-comments text-base md:text-l"></i>
                                <span className="text-xs md:text-sm text-center ml-2">
                                    {" "}
                                    General
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
