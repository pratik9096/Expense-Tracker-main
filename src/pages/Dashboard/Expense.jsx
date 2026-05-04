import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Inputs/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../Expense/AddExpenseForm';
import ExpenseList from '../../Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
    useUserAuth(); 

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
      
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
          show: false,
          data: null,
    });
  
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

        // Get All Income Details
        const fetchExpenseDetails = async () => {
            if (loading) return;
    
            setLoading(true);
    
            try {
                const response = await axiosInstance.get(
                    `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
                );
                if (response.data) {
                    setExpenseData(response.data);
                }
            } catch (error) {
                console.log("Something went wrong. Please try again.", error);
            } finally {
                setLoading(false);
            }
        };
    
        // Handle Add Income
        const handleAddExpense = async (expense) => {
            const { category, amount, date, icon } = expense;
    
            // Validation Checks
            if (!category.trim()) {
                toast.error("category is required.");
                return;
            }
    
            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                toast.error("Amount should be a valid number greater than 0.");
                return;
            }
    
            if (!date) {
                toast.error("Date is required.");
                return;
            }
    
            try {
                await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                    category,
                    amount,
                    date,
                    icon,
                });
                
                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
            } catch (error) {
                console.error(
                    "Error adding expense:",
                    error.response?.data?.message || error.message
                );
                toast.error(error.response?.data?.message || "Failed to add expense");
            }
        };

                // Delete Income
                const deleteExpense = async (id) => {
                    try {
                        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
                        
                        setOpenDeleteAlert({ show: false, data: null });
                        toast.success("Expense details deleted successfully");
                        fetchExpenseDetails();
                    } catch (error) {
                        console.error(
                            "Error deleting expense:",
                            error.response?.data?.message || error.message
                        );
                        toast.error(error.response?.data?.message || "Failed to delete expense");
                    }
                };
        
                // Handle download income details
                const handleDownloadExpenseDetails = async () => {
                    try {
                      const response = await axiosInstance.get(
                        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
                        {
                          responseType: "blob",
                        }
                      );
                  
                      // Create a URL for the blob
                      const url = window.URL.createObjectURL(new Blob([response.data]));
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", "expense_details.xlsx");
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error("Error downloading expense details:", error);
                      toast.error("Failed to download expense details. Please try again!");
                    }
                  };
        

        useEffect(() => {
            fetchExpenseDetails(); 
            return () => {}
        },[])

  return (
    <DashboardLayout activeMenu="Expense">
        <div className="my-5 mx-auto"> 
            <div className="grid grid-cols-1 gap-6">
                <div> 
                    <ExpenseOverview
                        transactions={expenseData}
                        onAddExpense={() => setOpenAddExpenseModal(true)}
                    />
                </div>

                <ExpenseList
                    transactions={expenseData}
                    onDelete={(id) => {
                        setOpenDeleteAlert({ show: true, data: id });
                    }}
                    onDownload={handleDownloadExpenseDetails}
                />

            </div>

            <Modal
                isOpen={openAddExpenseModal}
                onClose={() => setOpenAddExpenseModal(false)}
                title="Add Expense"
            >
                <AddExpenseForm onAddExpense={handleAddExpense} />
            </Modal>

            <Modal
                isOpen={openDeleteAlert.show}
                onClose={() => setOpenDeleteAlert({ show: true, data: null })}
                title="Delete Expense"
            >
                <DeleteAlert
                    content="Are you sure you want to delete this expense detail?"
                    onDelete={() => deleteExpense(openDeleteAlert.data)}
                    onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
                />
            </Modal>
        </div>       
    </DashboardLayout>     
  )
}

export default Expense