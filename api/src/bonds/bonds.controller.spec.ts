import { BondsController } from './bonds.controller';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { IntentGuard } from '../common/guards/intent.guard';

describe('BondsController guards', () => {
  const GUARDS_METADATA = '__guards__';

  it('guards POST /:id/sweep-undistributed with JWT + Permissions + Intent guards', () => {
    const guards: unknown[] = Reflect.getMetadata(
      GUARDS_METADATA,
      BondsController.prototype.sweepUndistributed,
    );
    expect(guards).toEqual([JwtAuthGuard, PermissionsGuard, IntentGuard]);
  });

  it('exposes GET /:id/undistributed as a read-only public endpoint', () => {
    const guards: unknown[] = Reflect.getMetadata(
      GUARDS_METADATA,
      BondsController.prototype.getUndistributedTotal,
    );
    expect(guards).toBeUndefined();
  });

  it('exposes GET /:id/claimable-credits as a read-only public endpoint', () => {
    const guards: unknown[] = Reflect.getMetadata(
      GUARDS_METADATA,
      BondsController.prototype.getClaimableCredits,
    );
    expect(guards).toBeUndefined();
  });

  it('routes the claimable-credits handler under the /bonds/:id/claimable-credits path', () => {
    const path = Reflect.getMetadata('path', BondsController.prototype.getClaimableCredits);
    expect(path).toBe(':id/claimable-credits');
  });

  it('routes the sweep handler under the /bonds/:id/sweep-undistributed path', () => {
    const path = Reflect.getMetadata('path', BondsController.prototype.sweepUndistributed);
    expect(path).toBe(':id/sweep-undistributed');
  });
});
