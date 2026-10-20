import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Ban,
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Layout/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { fetchAllLandlords, fetchLandlordVerificationDocument } from "./api/admin.api";
import {
  verifyLandlordAccount,
  suspendLandlordAccount,
  unsuspendLandlordAccount,
} from "./api/accountManagement.api";

/* ---------------- CONSTANTS ---------------- */

const TABS = ["all", "PENDING", "VERIFIED", "UNVERIFIED", "SUSPENDED"];

/* ---------------- MAIN COMPONENT ---------------- */

const AdminAccounts = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchAllLandlords();
        setAccounts(data);
      } catch {
        toast.error("Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

  /* ---------------- ACTION HANDLERS ---------------- */

  const handleVerify = async (username, idNumber, address) => {
    try {
      await verifyLandlordAccount(username, idNumber, address);
      toast.success("Account verified");

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.ownerusername === username
            ? { ...acc, accountStatus: "VERIFIED" }
            : acc
        )
      );
    } catch {
      toast.error("Verification failed");
    }
  };

  const handleSuspend = async (username) => {
    try {
      await suspendLandlordAccount(username);
      toast.success("Account suspended");

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.ownerusername === username
            ? { ...acc, accountStatus: "SUSPENDED" }
            : acc
        )
      );
    } catch {
      toast.error("Suspend failed");
    }
  };

  const handleUnsuspend = async (username) => {
    try {
      await unsuspendLandlordAccount(username);
      toast.success("Account unsuspended");

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.ownerusername === username
            ? { ...acc, accountStatus: "UNVERIFIED" }
            : acc
        )
      );
    } catch {
      toast.error("Unsuspend failed");
    }
  };

  /* ---------------- HELPERS ---------------- */

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-yellow-500 text-white">
            <ShieldAlert className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "VERIFIED":
        return (
          <Badge className="bg-success text-white">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
          </Badge>
        );
      case "UNVERIFIED":
        return (
          <Badge variant="secondary">
            <XCircle className="mr-1 h-3 w-3" /> Unverified
          </Badge>
        );
      case "SUSPENDED":
        return (
          <Badge className="bg-destructive text-white">
            <Ban className="mr-1 h-3 w-3" /> Suspended
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredAccounts = (filter) =>
    filter === "all"
      ? accounts
      : accounts.filter((a) => a.accountStatus === filter);

  const handleViewDocument = async (id) => {
    const preview = window.open("about:blank", "_blank");
    if (!preview) {
      toast.error("Allow pop-ups to view verification documents");
      return;
    }

    try {
      const document = await fetchLandlordVerificationDocument(id);
      const url = URL.createObjectURL(document);
      preview.opener = null;
      preview.location.href = url;
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      preview.close();
      toast.error("Failed to load verification document");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading accounts...</div>;
  }

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link to="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Account Management</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <TabList className="flex gap-4 border-b mb-6">
            <Tab>All</Tab>
            <Tab>Pending</Tab>
            <Tab>Verified</Tab>
            <Tab>Unverified</Tab>
            <Tab>Suspended</Tab>
          </TabList>

          {TABS.map((tab) => (
            <TabPanel key={tab}>
              <AccountTable
                accounts={filteredAccounts(tab)}
                getStatusBadge={getStatusBadge}
                handleVerify={handleVerify}
                handleSuspend={handleSuspend}
                handleUnsuspend={handleUnsuspend}
                handleViewDocument={handleViewDocument}
                openNoticeModal={(acc) => {
                  setSelectedAccount(acc);
                  setModalOpen(true);
                }}
              />
            </TabPanel>
          ))}
        </Tabs>

        <NoticeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          account={selectedAccount}
        />
      </main>
    </div>
  );
};

/* ---------------- TABLE ---------------- */

const AccountTable = ({
  accounts,
  getStatusBadge,
  handleVerify,
  handleSuspend,
  handleUnsuspend,
  handleViewDocument,
  openNoticeModal,
}) => (
  <div className="overflow-x-auto rounded-lg border bg-card">
    <table className="w-full border-collapse">
      <thead className="bg-muted sticky top-0 z-10">
        <tr className="text-left text-sm font-medium text-muted-foreground">
          <th className="px-4 py-3">Username</th>
          <th className="px-4 py-3">ID Number</th>
          <th className="px-4 py-3">Address</th>
          <th className="px-4 py-3">Identification Document</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3 text-right">Action</th>
        </tr>
      </thead>

      <tbody>
        {accounts.map((account) => {
          return (
            <tr
              key={account.id}
              className="border-t hover:bg-muted/50 transition"
            >
              <td className="px-4 py-3 font-medium">
                {account.ownerusername}
              </td>

              <td className="px-4 py-3">
                {account.idNumber || "—"}
              </td>

              <td className="px-4 py-3">
                {account.address || "—"}
              </td>

              <td className="px-4 py-3">
                {account.documentPath ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDocument(account.id)}
                  >
                    View Document
                  </Button>
                ) : (
                  "—"
                )}
              </td>

              <td className="px-4 py-3">
                {getStatusBadge(account.accountStatus)}
              </td>

              <td className="px-4 py-3 text-right space-x-2">
                {account.accountStatus === "PENDING" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleVerify(
                          account.ownerusername,
                          account.idNumber,
                          account.address
                        )
                      }
                    >
                      <ShieldCheck className="mr-1 h-4 w-4" />
                      Verify
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => openNoticeModal(account)}
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}

                {account.accountStatus === "VERIFIED" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      handleSuspend(account.ownerusername)
                    }
                  >
                    <ShieldAlert className="mr-1 h-4 w-4" />
                    Suspend
                  </Button>
                )}

                {account.accountStatus === "SUSPENDED" && (
                  <Button
                    size="sm"
                    onClick={() =>
                      handleUnsuspend(account.ownerusername)
                    }
                  >
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Unsuspend
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {accounts.length === 0 && (
      <div className="p-6 text-center text-muted-foreground">
        No accounts found.
      </div>
    )}
  </div>
);

/* ---------------- NOTICE MODAL ---------------- */

const NoticeModal = ({ isOpen, onClose, account }) => {
  const [message, setMessage] = useState("");

  if (!account) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Send Notice to {account.ownerusername}
          </DialogTitle>
        </DialogHeader>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full h-24 p-2 border rounded"
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAccounts;
