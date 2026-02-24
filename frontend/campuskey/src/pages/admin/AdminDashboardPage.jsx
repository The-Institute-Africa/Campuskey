import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import Header from '@/components/Layout/Header';
import {
    Building2,
    Users,
    UserCheck,
    UserPlus,
    TrendingUp,
    ShieldAlert,
    CheckCircle2,
    XCircle,
    Mail,
} from "lucide-react";
import { useAuth } from '@/pages/auth/api/store/auth.store';
import { fetchDashboardStats } from "./api/admin.api";

const AdminDashboard = () => {
    const { token,user, logout } = useAuth();
    const [stats, setStats] = useState([]);

    useEffect(() => {
        async function loadStats() {
            try {
                const d = await fetchDashboardStats();
                setStats([
                    { label: "Total Properties", value: d.totalProperties, icon: Building2, color: "text-primary" },
                    { label: "Total Landlords", value: d.totalLandlords, icon: Users, color: "text-secondary" },
                    { label: "Total Students", value: d.totalStudents, icon: UserCheck, color: "text-success" },
                    { label: "New Landlords", value: d.newLandlords, icon: UserPlus, color: "text-warning", badge: "This Month" },
                    { label: "New Students", value: d.newStudents, icon: UserPlus, color: "text-warning", badge: "This Month" },
                    { label: "Verified Accounts", value: d.verifiedAccounts, icon: CheckCircle2, color: "text-success" },
                    { label: "Unverified Accounts", value: d.unverifiedAccounts, icon: XCircle, color: "text-destructive" },
                    { label: "Suspended Accounts", value: d.suspendedAccounts, icon: ShieldAlert, color: "text-destructive" },
                ]);
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            }
        }

        loadStats();
    }, []);
/*
    if (!stats.length)
        return <div>Loading...</div>;
*/
    return (
        <div className="min-h-screen bg-background">
            <Header />
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Platform Statistics */}
                <div className="mb-8">
                    <h2 className="mb-6 text-3xl font-bold">Platform Statistics</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <Card key={stat.label} className="p-6 shadow-card transition-all hover:shadow-card-hover">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                                        {stat.badge && <Badge className="mt-2">{stat.badge}</Badge>}
                                    </div>
                                    <div className={`rounded-full bg-muted p-3 ${stat.color}`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Link to="/admin/accounts">
                            <Card className="cursor-pointer p-6 shadow-card transition-all hover:shadow-card-hover">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Manage Accounts</h3>
                                <p className="text-muted-foreground">
                                    View and manage user accounts, suspensions, and verifications
                                </p>
                            </Card>
                        </Link>

                        <Link to="/admin/properties">
                            <Card className="cursor-pointer p-6 shadow-card transition-all hover:shadow-card-hover">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                                    <Building2 className="h-6 w-6 text-secondary" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Manage Properties</h3>
                                <p className="text-muted-foreground">
                                    Review, verify, suspend, or ban property listings
                                </p>
                            </Card>
                        </Link>

                        <Link to="/admin/messaging">
                            <Card className="cursor-pointer p-6 shadow-card transition-all hover:shadow-card-hover">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                                    <Mail className="h-6 w-6 text-success" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Send Messages</h3>
                                <p className="text-muted-foreground">
                                    Send emails or WhatsApp messages to users
                                </p>
                            </Card>
                        </Link>
                    </div>
                </div>

                {/* User Activity Placeholder */}
                <div>
                    <h2 className="mb-6 text-2xl font-bold">User Activity</h2>
                    <Card className="p-6">
                        <div className="flex h-64 items-center justify-center text-muted-foreground">
                            <div className="text-center">
                                <TrendingUp className="mx-auto mb-4 h-12 w-12" />
                                <p>User activity chart coming soon</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
