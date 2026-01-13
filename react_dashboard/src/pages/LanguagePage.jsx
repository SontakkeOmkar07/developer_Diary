import React, {  useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AddErrorModal } from "../components/AddErrorModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MainSection } from "./MainSection";
import { Card } from "../components/Card";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaCode } from "react-icons/fa";
import { useEffect } from "react";
import { deleteData, getData, postData } from "../api/GetApi";
// import { CountContext } from "../context_api/CountContext";
// import { CountProvider } from "../context_api/CountProvider";

export const LanguagePage = () => {


  const [showPage, setShowPage] = useState(false);

  const [errors, setErrors] = useState([]);

  const [selectError, setSelectError] = useState(null);

  const [loading, setLoading] = useState(true);

  const [searched, setSearched] = useState("");

  //check length

  // const errorCount = errors.length;

  const searchData = searched
    ? errors.filter((curError) =>
        curError.title?.toLowerCase().includes(searched.toLowerCase())
      )
    : errors;

  console.log(searchData);

  //handleDelete

  const handleDelete = async (id) => {
    try {
      const res = await deleteData(id);
      console.log(res);

      setErrors((prevErrors) => prevErrors?.filter((error) => error.id !== id));

      setSelectError((prev) => (prev?.id === id ? null : prev));
    } catch (error) {
      console.error("Card not deleted", error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClick = (error) => {
    setSelectError(error);
  };

  const { language } = useParams();

  
  const normalizeLanguage = (name = "") => {
    return decodeURIComponent(name)
      .toLowerCase()
      .replace(".js", "")
      .replace(/\s+/g, "");
  };

  useEffect(() => {
    const fetchedData = async () => {
      if (!language) return;

      setLoading(true);

      try {
        const res = await getData(normalizeLanguage(language));

        setErrors(res?.data?.data ?? []);
      } catch (error) {
        console.error("Error message:", error.message);
        setErrors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchedData();
  }, [language]);

  const { state } = useLocation();

  const color = state?.color || "#22c55e";
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  console.log(language, normalizeLanguage(language));



  //use context to get data

  // const {increseCount}  = useContext(CountContext);

  const handleSaveError = async (newError) => {
    try {
      const normalizedLang = normalizeLanguage(language);

      const saveLoad = {
        ...newError,
        language: normalizedLang,
      };
      const res = await postData(saveLoad);

      console.log(res.data);

      setErrors((prev) =>
        Array.isArray(prev) ? [...prev, res.data.data] : [res.data.data]
      ); //this line is very important to give the data from backend
      
      setSelectError(null);
      setShowPage(false);
      setSearched("");
      errors.length;
    } catch (error) {
      console.error(error.message);
    }
  };


  
  

  return (
    <>
      <section className="min-h-screen flex">
        <aside className="w-1/4  p-4 bg-gray-800 shrink-0">
          <header>
            <h1
              onClick={handleBack}
              className="text-gray-400 hover:text-green-400 flex items-center gap-1 cursor-pointer"
            >
              <IoMdArrowBack /> Back to Languages
            </h1>

            <section className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-slatee-900 w-10 h-10 rounded-md flex justify-center items-center shadow-lg border border-white/20"
                    style={{ color: color }}
                  >
                    <FaCode className=" text-xl" />
                  </div>

                  <h1 className="text-2xl font-semibold text-white tracking-wide">
                    {language} Debugger
                  </h1>
                </div>

                <button
                  onClick={() => setShowPage(true)}
                  className="bg-slate-800 rounded-full cursor-pointer border border-dashed border-slate-500 w-8 h-8 flex items-center justify-center hover:text-green-400 hover:border-green-400 transition-all duration-200"
                >
                  <IoMdAdd className="text-xl text-white " />
                </button>
              </div>

              <div className="relative mt-5">
                <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg font-bold" />
                <input
                  value={searched}
                  onChange={(e) => setSearched(e.target.value)}
                  type="text"
                  placeholder="Search errors..."
                  className="w-full pl-10 pr-3 text-white py-2 text-gray-400 bg-slate-900 rounded-md ring-1 ring-slate-700 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
            </section>
          </header>

          <hr className="w-full border-slate-700 my-4" />

          <footer>
            <section className="mt-4">
              <ul>
                {loading
                  ? "Loading..."
                  : searchData.map((error) => (
                      <Card
                        key={error.id}
                        error={error}
                        onClick={() => onClick(error)}
                        handleDelete={() => {
                          handleDelete(error.id);
                        }}
                      />
                    ))}
              </ul>
            </section>
          </footer>
        </aside>
        

        
          <MainSection setShowPage={setShowPage} selectError={selectError}
           />
       
      </section>

      {showPage && (
        <AddErrorModal
          onSave={handleSaveError}
         
          onClose={() => setShowPage(false)}
        />
      )}
    </>
  );
};
