import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { setAccountState } from '@/api/profile.api';
import { useAuth } from '@/pages/auth/api/store/auth.store';
import { CheckProfile } from '@/pages/auth/api/checkProfile.api';

const ProfileAccountActions = ({ accountState, onStateChange }) => {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { logout, setUser } = useAuth();

  const changeState = async (action, nextState) => {
    if (action === 'delete' && !window.confirm(
      'Deactivate this account? Your profile details will be removed and transaction records retained.'
    )) return;
    setBusy(true);
    try {
      await setAccountState(action);
      setUser(await CheckProfile());
      onStateChange(nextState);
      toast({ title: action === 'delete' ? 'Account deactivated' : `Account ${nextState.toLowerCase()}` });
      if (action === 'delete') {
        logout();
        navigate('/login', { replace: true });
      }
    } catch (error) {
      toast({
        title: 'Could not update account',
        description: error.response?.data?.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="space-y-3 rounded-lg border border-destructive/30 p-5">
      <h2 className="font-semibold">Account status: {accountState || 'ACTIVE'}</h2>
      <p className="text-sm text-muted-foreground">
        Suspending pauses your account and can be reversed. Deactivation removes your profile details while keeping transaction records.
      </p>
      {accountState === 'SUSPENDED' ? (
        <Button disabled={busy} onClick={() => changeState('reactivate', 'ACTIVE')}>Reactivate account</Button>
      ) : accountState !== 'DELETED' ? (
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" disabled={busy} onClick={() => changeState('suspend', 'SUSPENDED')}>
            Suspend account
          </Button>
          <Button variant="destructive" disabled={busy} onClick={() => changeState('delete', 'DELETED')}>
            Deactivate account
          </Button>
        </div>
      ) : null}
    </section>
  );
};

export default ProfileAccountActions;
