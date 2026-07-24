import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { getTermsApi } from "../services/userService";

function TermsAndConditions() {
  const { data, fetchData, loading, error } = useFetch(getTermsApi);

  useEffect(() => {
    fetchData();
    document.title = "Terms and Conditions | Real Estate Shop";
  }, [fetchData]);

  const termData = data && data.length > 0 ? data[0] : null;

  return (
    <>
      <div className="container py-5" style={{ minHeight: "60vh" }}>
        {loading && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && termData && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h1 className="fw-bold mb-3 text-center">{termData.title}</h1>
              <p className="text-muted text-center mb-4">
                Last updated: {new Date(termData.updatedAt).toLocaleDateString()}
              </p>
              {termData.description && (
                <p className="lead text-center mb-5">{termData.description}</p>
              )}
              
              <div 
                className="content-wrapper p-4 p-md-5 bg-white shadow-sm rounded-4"
                style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#4b5563" }}
                dangerouslySetInnerHTML={{ __html: termData.textEditor }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TermsAndConditions;
