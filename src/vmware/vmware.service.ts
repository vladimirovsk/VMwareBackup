import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class VMwareService {
	private executeCommand(command: string): Promise<string> {
		return new Promise((resolve, reject) => {
			exec(command, (error, stdout, stderr) => {
				if (error) reject(stderr || error.message);
				resolve(stdout);
			});
		});
	}

	async getVMList(): Promise<string[]> {
		const command = `govc vm.info`; // govc command to get a list of virtual machines
		const result = await this.executeCommand(command);
		return result.split('\n'); // Parsing the result of a command
	}

	async createSnapshot(vmName: string, snapshotName: string): Promise<string> {
		const command = `govc snapshot.create -vm "${vmName}" "${snapshotName}"`;
		return this.executeCommand(command);
	}

	async downloadBackup(vmName: string, targetPath: string): Promise<string> {
		const command = `scp root@<IP>:<REMOTE_PATH>/${vmName}.tar.gz ${targetPath}`;
		return this.executeCommand(command);
	}
}
