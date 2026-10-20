import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";
import { useAuth } from "@/pages/auth/api/store/auth.store"

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login({ username, password });

      if (!result.success) {
        toast({
          title: "Login Failed",
          description: result.message,
          variant: "destructive",
        });
        return;
      }

      const roles = result.user?.roles ?? [];

      console.log(roles);
      toast({ title: "Login Successful!", description: "Redirecting..." });
      // ROLE-BASED REDIRECT
      if (roles.includes("ROLE_ADMIN")) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/denied-access", { replace: true });
      }
    } catch (err) {
      toast({
        title: "Login Error",
        description: "Unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md p-8 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold">Admin Login</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div>
                        <Label htmlFor="email">Admin Email</Label>
                        <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="email"
                                name="username"
                                type="text"
                                placeholder="admin@example.com"
                                className="pl-10"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                               value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Login button */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AdminLogin;
